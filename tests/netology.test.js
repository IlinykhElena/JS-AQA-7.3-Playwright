const { chromium } = require("playwright");

import { email } from "./user";
import { password } from "./user";

const browser = await chromium.launch({
  headless: false,
  slowMo: 5000,
  devtools: true,
});

const page = (await browser).newPage();

test.beforeEach(async ({ page }) => {
  await page.goto("https://netology.ru/");
});

test.afterAll(async () => {
  await browser.close();
});

test("sucsessful login", async ({ page }) => {
  await expect(page).toHaveURL("https://netology.ru/");

  await page.getByRole("link", { name: "Войти" }).click();
  await expect(page).toHaveURL("https://netology.ru/?modal=sign_in");

  await page.getByPlaceholder("Email").click();
  await page.getByPlaceholder("Email").fill("email");
  await page.getByPlaceholder("Пароль").click();
  await page.getByPlaceholder("Пароль").fill("password");
  await page.getByTestId("login-submit-btn").click();
  await expect(page).toHaveURL("https://netology.ru/profile");
});

test("login with false email", async ({ page }) => {
  var faker = require("faker");
  await expect(page).toHaveURL("https://netology.ru/");

  await page.getByRole("link", { name: "Войти" }).click();
  await expect(page).toHaveURL("https://netology.ru/?modal=sign_in");

  await page.getByPlaceholder("Email").click();
  await page.getByPlaceholder("Email").fill(faker.internet.email());
  await page.getByPlaceholder("Пароль").click();
  await page.getByPlaceholder("Пароль").fill("password");
  await page.getByTestId("login-submit-btn").click();
  await expect(page).toHaveURL("https://netology.ru/profile");
});

test("login with false password", async ({ page }) => {
  var faker = require("faker");
  await expect(page).toHaveURL("https://netology.ru/");

  await page.getByRole("link", { name: "Войти" }).click();
  await expect(page).toHaveURL("https://netology.ru/?modal=sign_in");

  await page.getByPlaceholder("Email").click();
  await page.getByPlaceholder("Email").fill("email");
  await page.getByPlaceholder("Пароль").click();
  await page.getByPlaceholder("Пароль").fill(faker.random());
  await page.getByTestId("login-submit-btn").click();
  await expect(page).toHaveURL("https://netology.ru/profile");
});

test("login with empty email", async ({ page }) => {
  await expect(page).toHaveURL("https://netology.ru/");
  await page.getByRole("link", { name: "Войти" }).click();
  await expect(page).toHaveURL("https://netology.ru/?modal=sign_in");
  await page.getByPlaceholder("Пароль").click();
  await page.getByPlaceholder("Пароль").fill("password");
  await expect().toHaveText("Обязательное поле");
});

test("login with empty password", async ({ page }) => {
  await expect(page).toHaveURL("https://netology.ru/");
  await page.getByRole("link", { name: "Войти" }).click();
  await expect(page).toHaveURL("https://netology.ru/?modal=sign_in");
  await page.getByPlaceholder("Email").click();
  await page.getByPlaceholder("Email").fill("email");
  await expect().toHaveText("Обязательное поле");
});
