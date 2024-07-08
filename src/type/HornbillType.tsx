export type Daemon = {
    id: string
    address: string
}

export type Identity = {
    id: string,
    publicKey: string,
    privateKey: string,
    expiry?: number
}

export type User = {
    identity: Identity,
    address: string
}

export type DaemonUserEntry = {
    daemon: Daemon,
    users: User[] | undefined
}

export type PageState = "loading" | "loaded" | "error"

export type ServerInfo = {
    publicKey: string,
    publicAddress: string
    allowedAddress: string[]
}

export type ConnectResult = {
    ok: boolean,
    user: User,
    serverInfo: ServerInfo

}

export type OpenIDUserInfo = {
    at_hash: string
    aud: string
    email: string
    email_verified: boolean
    exp: number
    iat: number
    iss: string
    name: string
    sub: string
}

export type UserInfo = {
    createdTime: string
    expiryTime: string
    info: OpenIDUserInfo
}