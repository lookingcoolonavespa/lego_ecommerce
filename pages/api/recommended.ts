import type { NextApiRequest, NextApiResponse } from 'next';
import * as puppeteer from 'puppeteer';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();

  await page.goto('https://www.lego.com/en-us');

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

  await page.waitForSelector(
    '.ProductRecommendationsstyles__Wrapper-sc-1anuv2e-0'
  );

  await page.evaluate(async () => {
    const recommended = document.body.querySelector(
      '.ProductRecommendationsstyles__Wrapper-sc-1anuv2e-0'
    );

    if (!recommended) {
      return res.status(500).send('something changed on the lego homepage');
    }

    const trackBar = recommended.querySelector(
      '.Carouselstyles__ScrollArea-gkr6gf-2'
    );

    if (!trackBar) {
      return res.status(500).send('something changed on the lego homepage');
    }

    await new Promise((resolve) => {
      setTimeout(() => resolve(undefined), 1000);
    });
    trackBar.scrollLeft = 1800;
    await new Promise((resolve) => {
      setTimeout(() => resolve(undefined), 1000);
    });
    trackBar.scrollLeft = 2400;
    await new Promise((resolve) => {
      setTimeout(() => resolve(undefined), 1000);
    });
    trackBar.scrollLeft = 3659;
  });

  await page.waitForSelector(
    '.ProductCarouselstyles__ProductWrapper-sc-159nny3-1:last-child .LazyImagestyles__Picture-sc-1gcjd00-1'
  );
  await page.waitForSelector(
    '.ProductCarouselstyles__ProductWrapper-sc-159nny3-1:last-child [data-test="product-leaf-title"]'
  );
  await page.waitForSelector(
    '.ProductCarouselstyles__ProductWrapper-sc-159nny3-1:last-child .RatingBarstyles__RatingContainer-sc-11ujyfe-2'
  );
  await page.waitForSelector(
    '.ProductCarouselstyles__ProductWrapper-sc-159nny3-1:last-child .ProductPricestyles__StyledText-vmt0i4-0'
  );

  const products = await page.evaluate(async () => {
    const recommended = document.body.querySelector(
      '.ProductRecommendationsstyles__Wrapper-sc-1anuv2e-0'
    );

    if (!recommended) {
      return res.status(500).send('something changed on the lego homepage');
    }

    const productWrappers = Array.from(
      recommended.querySelectorAll(
        '.ProductCarouselstyles__ProductWrapper-sc-159nny3-1'
      )
    );

    if (!productWrappers.length) {
      return res.status(500).send('something changed on the lego homepage');
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
        return res.status(500).send('something changed on the lego homepage');
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
