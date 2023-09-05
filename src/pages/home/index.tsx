import styles from './home.module.css'
import {FaSearchDollar} from 'react-icons/fa'
import { Link, useNavigate } from 'react-router-dom'
import { FormEvent, useEffect, useState } from 'react'

//https://coinlib.io/api/v1/coinlist?key=9471719e611e0cbf&pref=BTC&page=1&order=volume_desc
//9471719e611e0cbf


interface CoinProps{
    name: string;
    delta_24h: string;
    price: string;
    symbol: string;
    volume_24h: string;
    market_cap: string;
    formatedMarket?: string;
    formatedPrice?: string;
  }
  
  interface DataProps{
    coins: CoinProps[];
  }
  
  


export function Home(){
    const [coins, setCoins] = useState<CoinProps[]>([])
    const [inputValue,setInputValue] = useState('')
    const navigation = useNavigate()

    
  useEffect(() => {
    async function getData(){
      fetch('https://sujeitoprogramador.com/api-cripto/?key=9471719e611e0cbf&pref=BRL')
      .then(response => response.json())
      .then((data: DataProps) => {
        let coinsData = data.coins.slice(0, 15); 

        let price = Intl.NumberFormat("pt-BR", {
            style: "currency",
            currency: "BRL",
        }); 

        const formatResult = coinsData.map((item) => {
          const formated = {
            ...item,
            formatedPrice: price.format(Number(item.price)),
            formatedMarket: price.format(Number(item.market_cap))
          }

          return formated;
        })

        // console.log(coinsData);
        //console.log(formatResult);
        setCoins(formatResult)
      })
    }

    getData()
    
  }, [])

  function handleSearch(e:FormEvent){
    e.preventDefault()
    if (inputValue ==='') return
    
    navigation(`/detail/${inputValue}`)
  }


    return(
        <main className={styles.container}>
            <form className={styles.form} onSubmit={handleSearch}>
                <input
                     placeholder='Digite o ativo'
                     value={inputValue}
                     onChange={(e)=>setInputValue(e.target.value)}
                     
                />
                <button type='submit'>
                    <FaSearchDollar size={30} color='#f5d7db' />
                </button>
            </form>
            
            <table>
                <thead>
                <tr>
                    <th scope="col">Moeda</th>
                    <th scope="col">Valor mercado</th>
                    <th scope="col">Preço</th>
                    <th scope="col">Volume</th>
                </tr>
                </thead>
         

                <tbody id="tbody">
                    {coins.map( coin =>(
                        <tr key={coin.name} className={styles.tr}>
                            <td className={styles.tdLabel} data-label='Moeda'>
                            <Link className={styles.link} to={`/detail/${coin.symbol}`}>
                                <span>{coin.name}</span> | {coin.symbol}
                            </Link>
                            </td>
                            <td className={styles.tdLabel}  data-label='Mercado'>
                            {coin.formatedMarket}
                            </td>
                            <td className={styles.tdLabel} data-label='Preço'>
                            {coin.formatedPrice}
                            </td>
                            <td className={(parseInt(coin?.delta_24h)) >= 0 ? styles.tdProfit : styles.tdLoss} data-label='Volume'>
                              <span>{coin.delta_24h}</span>
                            </td>

                        </tr>
                    ))}
                  
                </tbody>
            </table>
        </main>
    )
}