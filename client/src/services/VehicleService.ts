// import axios from "axios";
import { share, delay, retryWhen, tap } from "rxjs/operators";
import { toast } from "react-toastify";
import { webSocket, WebSocketSubject } from "rxjs/webSocket";
import { SOCKET_URL } from "../config";
import { VehicleData } from "../pages/Layout";

let _socket: WebSocketSubject<any>;
export let messages: any;

export const connect = () => {
  if (!_socket || _socket.closed) {
    console.log("===== New socket connection ========");
    _socket = webSocket({ url: `${SOCKET_URL}/vehicles/` });
    messages = _socket.pipe(
      share(),
      retryWhen((errors) =>
        errors.pipe(
          // log error message
          tap((val) => {
            toast.error(`Socket connection error, retrying...`, {
              position: "top-right",
              autoClose: 1500,
            });
          }),
          // retry in .5 secs
          delay(500)
        )
      )
    );
    _socket.subscribe({
      error: (e) => {
        console.log("============== socket error =================");
        console.error({ e });
      },
      next: (msg) => console.log("===== data from socket ============", msg),
      complete: () => toast.info("Socket connection closed"),
    });
  }
  console.log("==== socket connection exists already ======");
  console.log("==== socket info after connection ======", {
    closed: _socket.closed,
    complete: _socket.complete,
  });
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

export const logSpeedViolation = (
  speed: any,
  alreadyLogged = false,
  item: VehicleData | null,
  roadSections: any[],
  speedLimit: number
) => {
  console.log("======= logging speed violation =================");
  connect();
  let section = roadSections.find(
    (section) => Number(section.speedLimit) === Number(speedLimit)
  );
  if (!alreadyLogged) {
    const message = {
      driver: item?.driver,
      vehicle: item?.vehicle,
      speed,
      speedLimit,
      section: {
        speedLimit: section?.speedLimit,
        name: section?.sectionName,
      },
      type: "add.speed.violation",
    };
    _socket.next(message);
    toast.info(`Speed violation recorded...`, {
      position: "top-right",
    });
  }
};
