import { test } from '@playwright/test';
import { LoginPage } from '../pages/loginpage.js';
import { logger } from '../utils/logger.js';

test('Login with valid credentials', async ({ page }) => {
  const loginPage = new LoginPage(page);

  logger.info('Navigating to login page...');
  await loginPage.goto();

  logger.info('Logging in with valid credentials...');
  await loginPage.login('standard_user', 'secret_sauce');

  logger.info('Asserting login success...');
  await loginPage.assertLoginSuccess();
});
