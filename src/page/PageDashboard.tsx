import {useEffect, useState} from "react";
import {Button, Divider, Skeleton, Tab, TabList, TabPanel, TabPanels, Tabs} from '@chakra-ui/react'
import {DaemonUserEntry, PageState, UserInfo} from "../type/HornbillType.tsx";

export function PageDashboard() {
    const [pageState, setPageState] = useState<PageState>("loading")
    const [isConnected, setConnected] = useState<boolean>(false)
    const [list, setList] = useState<DaemonUserEntry[]>([])
    const [userInfo, setUserInfo] = useState<UserInfo | undefined>(undefined)
    const apiPath = import.meta.env.VITE_PATH_API
    const pathAuthLogin = import.meta.env.VITE_PATH_AUTH_LOGIN

    function update() {
        console.log("Updating server list")

        fetch(apiPath + "/userinfo", {credentials: "include"}).then(v => {
            if (!v.ok) {
                throw new Error("Not authenticated")
            }
            return v.json()
        }).then((result) => {
            console.log("userinfo", result)
            setUserInfo(result)

        }).catch(() => {
            window.location.href = pathAuthLogin
        })
        fetch(apiPath + "/list", {credentials: "include"}).then(v => v.json()).then((result) => {
            console.log("Updated server list")
            if (result === undefined || result.error !== undefined) {
                setList([])
            } else {
                setList(result)
                setPageState("loaded")
            }
        })
    }

    function disconnect(target: string) {
        fetch(apiPath + "/logout/" + target, {
            credentials: "include",
            method: "POST"
        })
            .then(v => v.json())
            .then(() => {
                update();
            })
            .catch(err => console.error(err))
    }

    useEffect(update, [])
    useEffect(() => {
        if (userInfo === undefined || userInfo.info === undefined) return
        const name = userInfo.info.name;
        setConnected(false)
        outerLoop:
            for (const daemonUserEntry of list) {
                if (daemonUserEntry.users === undefined) continue;
                for (const user of daemonUserEntry.users) {
                    if (user.identity.id === name) {
                        setConnected(true)
                        break outerLoop
                    }
                }
            }
    }, [list, userInfo])

    let tabListContent = <Tab><Skeleton height={"1.5rem"} width={"10rem"}></Skeleton></Tab>
    if (pageState === "loaded") {
        tabListContent = <TabList>
            {list.map((value, i) => {
                return <Tab key={i}>
                    {value.daemon.id}
                </Tab>
            })}
        </TabList>
    }
    return <>
        <Tabs variant='enclosed'>
            <TabList>
                {tabListContent}
            </TabList>
            <TabPanels>
                {list.map((value, i) => {
                    const connectPageUrl = "/connect/" + encodeURI(value.daemon.id)
                    let connectButton = isConnected ? <Button>
                        Connected
                    </Button> : <Button colorScheme={"green"}>
                        Connect
                    </Button>

                    connectButton = <a href={connectPageUrl}>{connectButton}</a>

                    const disconnectButton = isConnected ?
                        <Button colorScheme={"red"} onClick={() => disconnect(value.daemon.id)}>
                            Disconnect
                        </Button> : <Button>
                            Disconnect
                        </Button>


                    return <TabPanel key={i}>
                        <div className={"flex flex-row"}>
                            {connectButton}
                            <div className={"w-2"}></div>
                            {disconnectButton}
                        </div>

                        <Divider className={"pt-4"}></Divider>
                        {value.users === undefined ? <></> : value.users.map((user, j) => {
                            return <div key={j}>
                                <div className={"p-4"}>
                                    User: {user.identity.id}
                                    <table>
                                        <tbody>
                                        <tr>
                                            <td className={"font-bold pr-4"}>
                                                Public key:
                                            </td>
                                            <td>
                                                {user.identity.publicKey}
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className={"font-bold"}>
                                                Expire:
                                            </td>
                                            <td>
                                                {user.identity.expiry === undefined ? "Never" : new Date(user.identity.expiry).toISOString()}
                                            </td>
                                        </tr>
                                        </tbody>
                                    </table>
                                </div>
                                <Divider></Divider>
                            </div>
                        })}
                    </TabPanel>
                })}
            </TabPanels>
        </Tabs>

    </>
}