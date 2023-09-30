import * as Yup from "yup";
import { Errors } from "../utils/errors.js";
import  DataCache  from "../utils/data_cache.js";
import DataCollector from "../utils/data_collector.js";
import  GraphCreator  from "../utils/graph_creator.js";


let indexController = {
  initial: async (req, res) => {
    try {
        //This is how you access query params req.query.id

        let symbol = req.query.symbol || "";
        let investment = Number(req.query.investment) || "";

        console.log(symbol)
        console.log(typeof symbol)
        console.log(investment)
        console.log(typeof investment)

        if (symbol == "" ){
          return res.status(200).json({"result":"Symbol doesn't exist","graph_data":"Symbol doesn't exist"});
        }

        if (investment=="" || typeof investment == 'string'){
          return res.status(200).json({"result":"Invalid investment amount","graph_data":"Invalid investment amount"});
        }

        const cache = new DataCache(symbol, investment);
        const collector = new DataCollector(symbol, investment);
        const creator = new GraphCreator(symbol);

        let result = await collector.driver_logic()
        let graph_data = await creator.driver_logic()

        if (result == undefined){
          result = "Symbol doesn't exist"
          graph_data = "Symbol doesn't exist"
        }

        console.log(`We have received the result ${result}`)

  
      return res.status(200).json({"result":result,"graph_data":graph_data});
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: Errors.SERVER_ERROR });
    }
  },

  home: async (req, res) => {
    try {
  
      return res.status(200).json({"result":"Express server is running",status:true});
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: Errors.SERVER_ERROR });
    }
  },

};

export default indexController;