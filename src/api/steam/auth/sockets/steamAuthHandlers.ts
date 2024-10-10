import { Socket } from 'socket.io';
import { EAuthTokenPlatformType, LoginSession } from 'steam-session';
import { steamAuthNameAndPassword, steamAuthQr } from './services/steamAuthService';

export const steamAuthHandlers = (socket: Socket) => {

  let session = new LoginSession(EAuthTokenPlatformType.SteamClient);

  steamAuthQr(socket, session);
  steamAuthNameAndPassword(socket, session);
};