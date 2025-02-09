import { useEffect, useState } from 'react'

const Home = () => {
    const [userData, setUserData] = useState(null)

    useEffect(() => {
        const storedData = localStorage.getItem('userData')
        if (storedData) {
            setUserData(JSON.parse(storedData))
        }
    }, [])

    return (
        <div>
            <h1>Bem-vindo, {userData?.nome}</h1>
            {/* Renderize outros dados conforme necessário */}
        </div>
    )
}

export default Home
