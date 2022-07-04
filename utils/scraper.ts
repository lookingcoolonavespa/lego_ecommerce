import axios from 'axios';
import * as cheerio from 'cheerio';

export default async function scrape(url: string) {
  try {
    const res = await axios(url);
    const html = await res.data;
    const $ = cheerio.load(html);
    console.log(
      html.includes('ProductRecommendationsstyles__Wrapper-sc-1anuv2e-0')
    );
    console.log($('#bltf482ca8807d59558', html).find('.dBBsuu'));
    // $('.fc-item__title', html).each(function () {
    //   //<-- cannot be a function expression
    //   const title = $(this).text();
    //   const url = $(this).find('a').attr('href');
    //   console.log(title);
    // });
  } catch (err) {
    console.log(err);
  }
}
