import { expect, test } from '@playwright/test'

test('home page loads with hero and featured cars', async ({ page }) => {
  await page.goto('/')
  await expect(page.getByRole('heading', { level: 1 })).toContainText('DEV BOYZ MOTORS')
  await expect(page.getByRole('tab', { name: 'Craftsmanship' })).toHaveAttribute('aria-selected', 'true')
  await page.getByRole('tab', { name: 'Performance' }).click()
  await expect(page.getByRole('link', { name: /Explore the Urus/ })).toBeVisible()
  await expect(page.getByTestId('car-card').first()).toBeVisible()
})

test('showroom filters are kept in the URL', async ({ page, isMobile }) => {
  await page.goto('/showroom?brand=Lexus')
  await expect(page.getByTestId('car-card')).toHaveCount(11)
  await page.getByRole('searchbox', { name: 'Search cars' }).fill('ls 500')
  await expect(page).toHaveURL(/q=ls\+500/)
  await expect(page.getByTestId('car-card')).toHaveCount(1)
  if (!isMobile) {
    await page.reload()
    await expect(page.getByTestId('car-card')).toHaveCount(1)
  }
})

test('malformed max price does not break the showroom', async ({ page }) => {
  await page.goto('/showroom?max=abc')
  await expect(page.getByTestId('car-card').first()).toBeVisible()
  await expect(page.locator('body')).not.toContainText('NaN')
})

test('wishlist toggle shows an undo toast', async ({ page }) => {
  await page.goto('/showroom')
  await page.getByRole('button', { name: /Save .* to wishlist/ }).first().click()
  const toast = page.getByRole('status').filter({ hasText: 'Saved to wishlist' })
  await expect(toast).toBeVisible()
  await toast.getByRole('button', { name: 'Undo' }).click()
  await expect(page.getByRole('link', { name: 'Wishlist, 0 saved' })).toBeVisible()
})

test('compare page lines up selected cars', async ({ page }) => {
  await page.goto('/showroom')
  const compareButtons = page.getByRole('button', { name: /^Compare / })
  await compareButtons.nth(0).click()
  await compareButtons.nth(1).click()
  await page.goto('/compare')
  await expect(page.getByRole('table')).toBeVisible()
  await expect(page.getByRole('columnheader')).toHaveCount(4) // label + 2 cars + "add a car"
})

test('enquiry form validates inline and hands off to WhatsApp', async ({ page }) => {
  await page.goto('/contact')
  await page.getByRole('button', { name: /Send enquiry/ }).click()
  await expect(page.getByText('Please enter your full name.')).toBeVisible()
  await page.getByLabel(/Full name/).fill('Ada Obi')
  await page.getByLabel(/Phone/).fill('+234 803 000 0000')
  await page.getByLabel(/Preferred date/).fill(new Date().toLocaleDateString('en-CA'))
  await page.getByLabel(/Preferred time/).fill('10:30')
  await page.getByLabel(/Message/).fill('I would like to view the Urus this week.')
  await page.getByRole('button', { name: /Send enquiry/ }).click()
  await expect(page.getByRole('link', { name: /Open WhatsApp/ })).toHaveAttribute('href', /wa\.me/)
})

test('quiz produces ranked matches', async ({ page }) => {
  await page.goto('/find-my-car')
  for (const answer of ['Up to ₦100M', 'Family & school runs', '7 or more', 'SUV', 'Don’t mind']) {
    await page.getByRole('button', { name: answer }).click()
  }
  await expect(page.getByText('Your top matches')).toBeVisible()
  await expect(page.getByText(/% match/).first()).toBeVisible()
})

test('command palette finds a car', async ({ page, isMobile }) => {
  test.skip(isMobile, 'keyboard shortcut is a desktop feature')
  await page.goto('/')
  await page.keyboard.press('Control+k')
  await page.getByPlaceholder('Search cars, brands or pages…').fill('urus')
  await page.keyboard.press('Enter')
  await expect(page).toHaveURL(/lamborghini-urus/)
})

test('unknown pages show the custom 404', async ({ page }) => {
  await page.goto('/no-such-car')
  await expect(page.getByRole('heading', { name: /left the showroom/ })).toBeVisible()
})

test('enquiry API rejects bad input', async ({ request }) => {
  const res = await request.post('/api/enquiries', { data: 'null', headers: { 'content-type': 'application/json' } })
  expect(res.status()).toBe(400)
})

test('owner page shows the owner and portfolio link', async ({ page }) => {
  await page.goto('/owner')
  await expect(page.getByRole('heading', { level: 1 })).toContainText('Imegu Favour')
  await expect(page.getByRole('link', { name: /Visit imegu.world/ })).toHaveAttribute('href', 'https://imegu.world')
  await expect(page.getByAltText(/Imegu Favour Ewomazino/)).toBeVisible()
})

test('finish picker changes accent and typeface, and remembers it', async ({ page }) => {
  await page.goto('/')
  const html = page.locator('html')
  await expect(html).toHaveAttribute('data-accent', 'bronze')
  await page.getByRole('button', { name: /Racing Green & Tan finish/ }).click()
  await expect(html).toHaveAttribute('data-accent', 'emerald')
  const font = await page.locator('h2').first().evaluate(el => getComputedStyle(el).fontFamily)
  expect(font.toLowerCase()).toContain('cormorant')
  await page.reload()
  await expect(html).toHaveAttribute('data-accent', 'emerald')
})

test('build & price flow updates the total and can reserve', async ({ page }) => {
  await page.goto('/build?car=lamborghini-urus-2022&step=1')
  await expect(page.getByRole('heading', { level: 1 })).toContainText('Urus')
  await page.getByRole('button', { name: /Bronze Metallic/ }).click()
  await expect(page).toHaveURL(/p=3/)
  await page.getByRole('button', { name: /Continue to interior/ }).click()
  await page.getByRole('button', { name: /Continue to packages/ }).click()
  await page.getByRole('button', { name: /Starlight headliner/ }).click()
  await page.getByRole('button', { name: /Continue to summary/ }).click()
  await expect(page.getByText('₦636,000,000').first()).toBeVisible() // 620M + 3.5M paint + 12.5M starlight
  await page.getByRole('button', { name: /Reserve a build slot/ }).click()
  await expect(page.getByRole('dialog')).toContainText('Reserve this car')
})

test('new pages load', async ({ page }) => {
  for (const [path, text] of [['/gallery', 'Walk the floor'], ['/craftsmanship', 'Paperwork first'], ['/accessories', 'Finishing touches'], ['/locations', 'Find us'], ['/service', 'Looked after'], ['/innovation', 'Luxury that'], ['/events', 'Private'], ['/journal', 'Stories worth'], ['/journal/the-quiet-art-of-the-phantom', 'quiet art']]) {
    await page.goto(path)
    await expect(page.getByRole('heading', { level: 1 })).toContainText(text)
  }
})

test('owner portal demo sign-in shows the dashboard', async ({ page }) => {
  await page.goto('/portal')
  await page.getByRole('button', { name: /Enter the demo owner/ }).click()
  await expect(page.getByRole('heading', { name: /Good evening/ })).toBeVisible()
})

test('concierge chat answers a quick question', async ({ page }) => {
  await page.goto('/')
  await page.getByRole('button', { name: 'Open concierge chat' }).click()
  await page.getByRole('button', { name: 'Where are you?' }).click()
  await expect(page.getByRole('link', { name: /See locations/ })).toBeVisible()
})
