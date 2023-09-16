import * as Yup from "yup";
import { Errors } from "../utils/errors.js";
import  DataCache  from "../utils/data_cache.js";
import DataCollector from "../utils/data_collector.js";
import  GraphCreator  from "../utils/graph_creator.js";


let indexController = {
  initial: async (req, res) => {
    try {
        //This is how you access query params req.query.id

        let symbol = req.query.symbol || 0;
        let investment = req.query.investment || 0;

        console.log(symbol)
        console.log(investment)

        const cache = new DataCache(symbol, investment);
        const collector = new DataCollector(symbol, investment);
        const creator = new GraphCreator(symbol);

        const result = await collector.driver_logic()
        const graph_data = await creator.driver_logic()

        console.log(`We have received the result ${result}`)

  
      return res.status(200).json({"result":result,"graph_data":graph_data});
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: Errors.SERVER_ERROR });
    }
  },

};

export default indexController;