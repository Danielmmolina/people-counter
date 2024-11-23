import { defineStore } from "pinia";
import axios from 'axios';

const URL_API = 'https://ikcount.com/iklab'; 
const ACCESS_TOKEN = 'ZGFuaWVsbW9saW5hbW9yYW4xODpBUElfS0VZQGExMjFhMzNhNWVkNmU1ODViZWM1ZWViMDZjNmEzOWU0NzljZTNlYjBmMTkwN2I4MmY1YWU1Y2UzNGQ1ZmMyZjc5NDAxN2I4MTQxODZhNzI3NTVhOGJjZmQwOGFkZWMxZmRjZGYwNjAzZDM2ZWY0Y2JmMjZmODBhMTg4MjI4Y2Y2OklLTEFCMDA1'

export const useCounterStore = defineStore('counter', {
    state: () => ({
        count: 0,
        count_in: 0,
        count_out: 0,

    }),

    actions: {
        async fetchCount( command, quantity ) {
            try {
                const response = await axios.post(`${URL_API}/ikcount/api/counting/command?atoken=${ACCESS_TOKEN}`,
                    {
                        "type": command,
                        quantity,
                        "client": "DEMO001",
                        "location": "DEMO001A1L1",
                        "mac_address": "DEMO001A1L1Z1MC4"
                    },
                    {
                        headers: {
                            "Content-Type": "application/json"
                        }
                    }

                );

                    if( command === 'manual-add'){
                        this.count += quantity;
                        this.count_in += quantity;
                        return;
                    }

                    this.count -= quantity;
                    this.count_out += quantity;

            } catch (error) {
               console.log(error);
            }        
        },
    }
});


