import {Spinner} from "@chakra-ui/react";
import {useEffect} from "react";

export function PageLogin() {
    const pathAuthLogin = import.meta.env.VITE_PATH_AUTH_LOGIN

    useEffect(() => {
        setTimeout(() => {
            window.location.href = pathAuthLogin
        })
    })

    return <div className={"fixed w-full h-full"}>
        <div className={"w-full h-full flex justify-center items-center"}>
            <Spinner
                thickness='4px'
                speed='0.65s'
                emptyColor='gray.200'
                color='blue.500'
                size='xl'
            />
        </div>
    </div>
}