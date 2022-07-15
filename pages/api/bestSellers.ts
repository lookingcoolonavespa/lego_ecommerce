import type { NextApiRequest, NextApiResponse } from 'next';
import * as puppeteer from 'puppeteer';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const browser = await puppeteer.launch({
    args: ['--disable-web-security'],
    headless: false,
  });
  const page = await browser.newPage();

  await page.goto('https://www.lego.com/en-us/bestsellers');

  await page.setViewport({
    width: 1800,
    height: 900,
  });

  await new Promise((resolve) => {
    setTimeout(() => resolve(undefined), 2000);
  });

  await page.waitForSelector('[data-test="age-gate-grown-up-cta"]');
  await page.click('[data-test="age-gate-grown-up-cta"]');

  await page.waitForSelector('[data-test="cookie-necessary-button"]');
  await page.click('[data-test="cookie-necessary-button"]');

  await new Promise((resolve) => {
    setTimeout(() => resolve(undefined), 2000);
  });

  await page.evaluate(async () => {
    document.documentElement.scroll(0, 2000);
    await new Promise((resolve) => {
      setTimeout(resolve, 2000);
    });
    document.documentElement.scroll(0, 3000);
    await new Promise((resolve) => {
      setTimeout(resolve, 2000);
    });
    document.documentElement.scroll(0, 4000);

    const btn = document.body.querySelector(
      '.Paginationstyles__ShowAllLink-npbsev-13'
    ) as HTMLElement;

    if (!btn) return;
    btn.click();

    await new Promise((resolve) => {
      setTimeout(resolve, 4000);
    });
    document.documentElement.scroll(0, 5000);
    await new Promise((resolve) => {
      setTimeout(resolve, 2000);
    });
    document.documentElement.scroll(0, 6000);
    await new Promise((resolve) => {
      setTimeout(resolve, 2000);
    });
    document.documentElement.scroll(0, 7000);
    await new Promise((resolve) => {
      setTimeout(resolve, 2000);
    });
    document.documentElement.scroll(0, 8000);
    btn.click();
    console.log(document.documentElement.scrollTop);
    await new Promise((resolve) => {
      setTimeout(resolve, 4000);
    });
    document.documentElement.scroll(0, 9000);
    await new Promise((resolve) => {
      setTimeout(resolve, 2000);
    });
    document.documentElement.scroll(0, 10000);
    await new Promise((resolve) => {
      setTimeout(resolve, 2000);
    });
    document.documentElement.scroll(0, 11000);
    await new Promise((resolve) => {
      setTimeout(resolve, 2000);
    });
    document.documentElement.scroll(0, 12000);
    btn.click();
    console.log(document.documentElement.scrollTop);
  });

  const products = await page.evaluate(async () => {
    const productGrid = document.body.querySelector(
      '.ProductGridstyles__Grid-lc2zkx-0'
    ) as HTMLDivElement;

    if (!productGrid) {
      return;
    }

    const productWrappers = Array.from(
      productGrid.querySelectorAll('.ProductGridstyles__Item-lc2zkx-1')
    );

    if (!productWrappers.length) {
      return;
    }

    return productWrappers.map((el) => {
      interface RatingElement extends Element {
        title: string;
      }

      interface ImgElement extends Element {
        src: string;
      }

      const imgEl: ImgElement | null = el.querySelector(
        '.LazyImagestyles__Picture-sc-1gcjd00-1 img'
      );
      const titleEl = el.querySelector('[data-test="product-leaf-title"]');
      const ratingEl: RatingElement | null =
        el.querySelector('.RatingBarstyles__RatingContainer-sc-11ujyfe-2') ||
        null;
      const priceEl = el.querySelector(
        '.ProductPricestyles__StyledText-vmt0i4-0'
      );

      if (!imgEl || !titleEl || !priceEl) {
        return;
      }
      return {
        imgSrc: imgEl.src,
        title: titleEl.textContent,
        rating: ratingEl?.title ?? null,
        price: priceEl.textContent,
      };
    });
  });

  res.status(200).json(products);

  await browser.close();
}
