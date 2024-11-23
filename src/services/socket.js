import { io } from 'socket.io-client'

const URL_SIO = 'https://ikcount.com';
const ACCESS_TOKEN = 'ZGFuaWVsbW9saW5hbW9yYW4xODpBUElfS0VZQGExMjFhMzNhNWVkNmU1ODViZWM1ZWViMDZjNmEzOWU0NzljZTNlYjBmMTkwN2I4MmY1YWU1Y2UzNGQ1ZmMyZjc5NDAxN2I4MTQxODZhNzI3NTVhOGJjZmQwOGFkZWMxZmRjZGYwNjAzZDM2ZWY0Y2JmMjZmODBhMTg4MjI4Y2Y2OklLTEFCMDA1'

export const socket = io(`${ URL_SIO }/live?atoken=${ ACCESS_TOKEN }`, {
    transports: ['polling', 'websocket'],
});
