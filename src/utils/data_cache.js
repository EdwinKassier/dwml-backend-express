import * as Yup from "yup";
import Logging from "../models/Logging";
import Results from "../models/Results";
import Opening_Average from "../models/Opening_Average";
import { Errors } from "../utils/errors";
import moment from "moment";
import * as dfd from "danfojs-node"

class DataCache {
  constructor(coinSymbol, investment) {
    this.coinSymbol = coinSymbol;
    this.investment = investment;
  }

  async check_if_valid_final_result_exists(self) {
    const existing_result_raw = await Results.findOne({
      where: { SYMBOL: this.coinSymbol, INVESTMENT: this.investment },
    });

    if (existing_result_raw !== null) {
      //There exists a historical cache for this query
      console.log(existing_result_raw);
      return True;
    } else {
      //There doesn\'t exist a valid historical query
      return False;
    }
  }

  //Get cached result for the current query
  async get_valid_final_result(self) {
    const existing_result_raw = await Results.findOne({
      where: { SYMBOL: this.coinSymbol, INVESTMENT: this.investment },
    });

    if (existing_result_raw !== null) {
      //There exists a historical cache for this query
      console.log(existing_result_raw);
      return existing_result_raw.toJSON();
    } else {
      //There doesn\'t exist a valid historical query
      return {};
    }
  }

  //Check if we have already stored a cached version of the opening price data for the symbol
  async check_if_historical_cache_exists(self) {
    const existing_result_raw = await Opening_Average.findOne({
      where: { SYMBOL: this.coinSymbol },
    });

    if (existing_result_raw !== null) {
      console.log(
        `There exists a historical cache for this symbol ${this.coinSymbol}`
      );
      return true;
    } else {
      console.log(
        `There doesn't exist a historical cache for this symbol ${this.coinSymbol}`
      );
      return false;
    }
  }

  //Get cached version of the opening price data for the symbol
  async get_historical_cache(self) {
    const existing_result_raw = await Opening_Average.findOne({
      where: { SYMBOL: this.coinSymbol },
    });

    if (existing_result_raw !== null) {
      return(existing_result_raw.toJSON());
    } else {
      return false;
    }
  }

  //Insert current query into the logging table
  async insert_into_logging(){

        let logging_item = {'SYMBOL':this.coinSymbol,'INVESTMENT':this.investment, 'GENERATIONDATE':new Date().toISOString()}
        try{

            const log = await Logging.create(logging_item);
            console.log(log.toJSON()+' was saved to logs')

        }
        catch(err){
            console.log(err) 
        }
    }

    //Insert final result from a query into the results table
    async insert_into_result(result){

        const QUERY = `${this.coin_symbol}-${this.investment}`


        let result_item = {
            "QUERY":QUERY,
            "NUMBERCOINS": result['NUMBERCOINS'],
            "PROFIT": result['PROFIT'],
            "GROWTHFACTOR": result['GROWTHFACTOR'],
            "LAMBOS": result['LAMBOS'],
            "INVESTMENT": this.investment,
            "SYMBOL": this.coinSymbol,
            "GENERATIONDATE": new Date().toISOString()
        }


        try{
            const log = await Results.create(result_item);
            console.log(log.toJSON()+' was saved to results')
        }
        catch(err){
            console.log(err)
        }
    }

    //Insert final result from data collector into the db
    async insert_into_opening_average(result){

        let opening_average_item = {'SYMBOL':this.coinSymbol, 'AVERAGE':result['AVERAGE'], 'GENERATIONDATE':new Date().toISOString()};

        try{
            const item = await Opening_Average.create(opening_average_item);
            console.log(log.toJSON()+' was saved to opening_average')
        }
        catch(err){
            console.log(err)
        }
    }

    
}

export default DataCache;
