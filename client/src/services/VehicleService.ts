// import axios from "axios";
import { share } from "rxjs/operators";
import { webSocket } from "rxjs/webSocket";

let _socket: any;
export let messages: any;

export const connect = () => {
  if (!_socket || _socket.closed) {
    _socket = webSocket(`ws://localhost:8000/vehicles/`);
    messages = _socket.pipe(share());
    messages.subscribe((message: any) => console.log(message));
  }
};

export const createSpeedLimit = (speedLimit: any) => {
  connect();
  const message = {
    type: "create.speed_limit",
    data: speedLimit,
  };
  _socket.next(message);
};

export const updateSpeedLimit = (trip: any) => {
  connect();
  const message = {
    type: "update.trip",
    data: trip,
  };
  _socket.next(message);
};
