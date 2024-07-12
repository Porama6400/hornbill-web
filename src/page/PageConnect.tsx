import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {ConnectResult} from "../type/HornbillType.tsx";
import {
    Button,
    Card,
    CardBody,
    Heading,
    Popover,
    PopoverArrow,
    PopoverContent,
    PopoverHeader,
    PopoverTrigger
} from "@chakra-ui/react";

export function GenerateWireGuardConfig(values: ConnectResult): string {
    console.log(values)
    let privateKey = values.user.identity.privateKey;
    if (privateKey === undefined || privateKey === "") {
        privateKey = "<private key>"
    }
    return `[Interface]
PrivateKey = ${privateKey}
Address = ${values.user.address}/32

[Peer]
PublicKey = ${values.serverInfo.publicKey}
AllowedIPs = ${values.serverInfo.allowedAddress.join(", ")}
Endpoint = ${values.serverInfo.publicAddress}
PersistentKeepalive = 30
`
}

export function SplitLines(input: string) {
    const parts = input.split("\n");
    return <>
        {parts.map(entry => {
            return <div>{entry}</div>
        })}
    </>
}

export function PageConnect() {
    const {target} = useParams();
    const [loginResult, setLoginResult] = useState<ConnectResult>()
    const apiPath = import.meta.env.VITE_PATH_API

    useEffect(() => {
        fetch(apiPath + "/login/" + target, {
            credentials: "include",
            method: "POST"
        })
            .then(v => v.json())
            .then(setLoginResult)
            .catch(err => console.error(err))

    }, [target])

    const wireGuardConfig = loginResult === undefined ? "" : GenerateWireGuardConfig(loginResult)

    function copyToClipboard() {
        navigator.clipboard.writeText(wireGuardConfig)
    }

    return <div className={"m-8"}>
        <Heading className={"pb-4"}>
            {target}
        </Heading>
        <Card>
            <CardBody>
                <textarea readOnly={true} className={"w-full min-h-64 resize-none"} value={wireGuardConfig}>
                </textarea>
                <Popover closeDelay={3000}>
                    <PopoverTrigger>
                        <Button onClick={copyToClipboard}>
                            Copy
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent w={"22"}>
                        <PopoverArrow/>
                        <PopoverHeader>Copied!</PopoverHeader>
                    </PopoverContent>
                </Popover>
            </CardBody>
        </Card>

        <a href={"/"}>
            <Button colorScheme={"red"} className={"w-24 mt-4"}>Back</Button>
        </a>
    </div>
}