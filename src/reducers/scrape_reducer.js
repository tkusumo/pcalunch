import {
  SCRAPE_LUNCH_SUCCESS,
  SCRAPE_LUNCH_FAILED,
  SCRAPE_BALANCE_SUCCESS,
  SCRAPE_BALANCE_FAILED,
} from '../constants';

const INITIAL_STATE = {
  lunchData: [],
  balanceData: [],
};

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case SCRAPE_LUNCH_SUCCESS:
      return { ...state, lunchData: action.payload };
    case SCRAPE_BALANCE_SUCCESS:
      return { ...state, balanceData: action.payload };
    default:
      return state;
  }
}
