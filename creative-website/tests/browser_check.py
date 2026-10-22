"""Browser checks. Requires Python Playwright and an installed Chrome browser.

Start Vite first, then run this file. Screenshots are written outside the repo.
"""
import json
import os
from pathlib import Path
from playwright.sync_api import sync_playwright, expect

URL = os.environ.get('SB_AERO_TEST_URL', 'http://127.0.0.1:5173/')
OUTPUT = Path(os.environ.get('SB_AERO_SCREENSHOTS', '/private/tmp/sb-aero-preview'))
OUTPUT.mkdir(parents=True, exist_ok=True)

with sync_playwright() as p:
    browser = p.chromium.launch(channel='chrome', headless=True)
    page = browser.new_page(viewport={'width': 1440, 'height': 1000}, reduced_motion='reduce')
    errors = []
    page.on('pageerror', lambda error: errors.append(str(error)))
    page.goto(URL)
    page.wait_for_load_state('networkidle')
    expect(page.get_by_role('heading', level=1)).to_have_text('Beyondthe shore.')
    page.screenshot(path=str(OUTPUT / 'desktop-hero.png'))

    # Each aircraft selection changes its real project description and specs.
    page.get_by_role('tab', name='Condor').click()
    expect(page.get_by_role('tabpanel')).to_contain_text('For a closer look at our coast.')
    expect(page.get_by_role('tabpanel')).to_contain_text('Marine research')
    assert 'aircraft=condor' in page.url
    page.reload()
    expect(page.get_by_role('tab', name='Condor')).to_have_attribute('aria-selected', 'true')
    page.get_by_role('tab', name='Condor').press('ArrowRight')
    expect(page.get_by_role('tab', name='RC Galaga')).to_have_attribute('aria-selected', 'true')
    expect(page.get_by_role('tabpanel')).to_contain_text('15+ min')
    page.get_by_role('tab', name='RC Galaga').press('Home')
    expect(page.get_by_role('tab', name='Skyscout')).to_be_focused()
    expect(page.get_by_role('tabpanel')).to_contain_text('20+ min')

    for name, content in [('Vertical lift', 'Four lift rotors'), ('Forward flight', 'One cruise propeller'), ('The airframe', 'A fixed-wing concept')]:
        page.get_by_role('button', name=name, exact=False).click()
        expect(page.locator('.part-description')).to_contain_text(content)
        expect(page.get_by_role('button', name=name, exact=False)).to_have_attribute('aria-pressed', 'true')

    page.get_by_role('button', name='Meet the whole team').click()
    expect(page.get_by_role('dialog')).to_be_visible()
    expect(page.locator('.directory-member')).to_have_count(10)
    page.wait_for_function('Array.from(document.querySelectorAll(".directory-member img")).every(img => img.complete && img.naturalWidth > 0)')
    page.screenshot(path=str(OUTPUT / 'crew-directory.png'))
    page.keyboard.press('Escape')
    expect(page.get_by_role('dialog')).not_to_be_visible()
    expect(page.get_by_role('button', name='Meet the whole team')).to_be_focused()

    page.locator('summary').filter(has_text='When can I meet the club?').click()
    expect(page.get_by_role('link', name='Open the SB Aero calendar')).to_be_visible()
    page.locator('summary').filter(has_text='When can I meet the club?').click()

    # Follow internal navigation and ensure all original links are wired.
    broken_anchors = page.locator('a[href^="#"]').evaluate_all('(links) => links.filter(a => !document.querySelector(a.getAttribute("href"))).map(a => a.getAttribute("href"))')
    assert not broken_anchors, broken_anchors
    expect(page.get_by_role('link', name='Join the crew', exact=True)).to_have_attribute('href', 'https://docs.google.com/forms/d/e/1FAIpQLSdnimrw_WGW1eqc9N5nO0xDxfg-oGchwFrlcJK7zAYO3uvMFw/viewform')

    layouts = []
    for width in [320, 375, 390, 650, 768, 1024, 1440]:
        page.set_viewport_size({'width': width, 'height': 900})
        overflow = page.evaluate('document.documentElement.scrollWidth > window.innerWidth')
        assert not overflow, f'Horizontal overflow at {width}px'
        layouts.append({'width': width, 'overflow': overflow})

    page.set_viewport_size({'width': 390, 'height': 844})
    page.get_by_role('button', name='Open menu').click()
    expect(page.get_by_role('navigation', name='Main navigation')).to_be_visible()
    page.keyboard.press('Escape')
    expect(page.get_by_role('button', name='Open menu')).to_be_focused()
    page.get_by_role('button', name='Open menu').click()
    page.get_by_role('navigation').get_by_role('link', name='The fleet').click()
    expect(page.get_by_role('button', name='Open menu')).to_have_attribute('aria-expanded', 'false')
    page.get_by_role('button', name='Meet the whole team').click()
    expect(page.get_by_role('dialog')).to_be_visible()
    page.get_by_role('button', name='Close team directory').click()

    # Trigger native lazy loading before the full-page visual review.
    page.get_by_role('link', name='Back to top').click()
    page.screenshot(path=str(OUTPUT / 'mobile-hero.png'))
    page.screenshot(path=str(OUTPUT / 'mobile-full.png'), full_page=True)
    page.set_viewport_size({'width': 1440, 'height': 1000})
    page.get_by_role('link', name='Back to top').click()
    page.screenshot(path=str(OUTPUT / 'desktop-full.png'), full_page=True)
    images = page.locator('img').evaluate_all('(images) => images.filter(i => i.complete && i.naturalWidth === 0).map(i => i.src)')
    assert not images, f'Broken images: {images}'
    assert not errors, errors
    print(json.dumps({'result': 'passed', 'layouts': layouts, 'page_errors': errors, 'broken_images': images, 'screenshots': str(OUTPUT)}, indent=2))
    browser.close()
