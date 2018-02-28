import cheerio from 'react-native-cheerio';
import {
  SCRAPE_LUNCH_SUCCESS,
  SCRAPE_LUNCH_FAILED,
  SCRAPE_BALANCE_SUCCESS,
  SCRAPE_BALANCE_FAILED,
} from '../constants';

export const scrapeLunches = lunchURL => async (dispatch) => {
  const unEntity = str => str.replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&apos;/g, "'");

  try {
    const response = await fetch(lunchURL);
    const htmlString = await response.text();
    const $ = cheerio.load(htmlString);

    const data = $('tr').nextAll().map((_, td) => ({
      date: $('nobr', td).text(),
      menu: unEntity($('td', td).next().html()),
    }));

    dispatch({ type: SCRAPE_LUNCH_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: SCRAPE_LUNCH_FAILED, payload: error.message });
  }
};

export const scrapeBalance = balanceURL => async (dispatch) => {
  try {
    const response = await fetch(balanceURL);
    const htmlString = await response.text();
    const $ = cheerio.load(htmlString);

    const data = $('tr').nextAll().map((_, td) => ({
      date: $('td', td).html(),
      desc: $('td', td).next().html(),
      debit: $('td', td).next().next().html(),
      credit: $('td', td).next().next().next()
        .html(),
      balance: $('td', td).next().next().next()
        .next()
        .html(),
    }));
    // const data = [];
    dispatch({ type: SCRAPE_BALANCE_SUCCESS, payload: data });
  } catch (error) {
    // console.log(error.message);
    dispatch({ type: SCRAPE_BALANCE_FAILED, payload: error.message });
  }
};
