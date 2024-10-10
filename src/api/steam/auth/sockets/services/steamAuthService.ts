import { Socket } from 'socket.io';
import { LoginSession } from "steam-session";

export const steamAuthQr = (socket: Socket, session: LoginSession) => {
    socket.on('authQr', async () => {
        socket.emit('authQr', { status: 'load_qr' });
        const objQr = await session.startWithQR()
        socket.emit('authQr', { status: 'success_load_qr', ...objQr });

        session.on('remoteInteraction', () => {
            socket.emit('authQr', { status: 'start_auth' });
        });

        session.on('authenticated', async () => {
            socket.emit('authQr', { status: 'successful_auth', accountName: session.accountName });
            // refreshToken: session.refreshToken
            // steamID: session.steamID
            // accountName: session.accountName
            // accessToken: session.accessToken
        });

        session.on('timeout', () => {
            socket.emit('authQr', { status: 'timeout' });
        });

        session.on('error', (err) => {
            socket.emit('authQr', { status: 'error' });
        });
    });
}

export const steamAuthNameAndPassword = (socket: Socket, session: LoginSession) => {
}