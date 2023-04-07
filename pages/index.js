import Head from 'next/head'
import Image from 'next/image'
import styles from '@/styles/Home.module.css'
import Banner from '@/components/banner/banner'
import NavBar from '@/components/nav/navbar'
import Card from '@/components/card/card'
import SectionCards from '@/components/card/section-cards'

import { getVideos, getPopularVideos } from '@/lib/video'

export async function getServerSideProps() {
  const disneyVideos = await getVideos('disney trailer')
  const travelVideos = await getVideos('Travel')
  const KLTVideos = await getVideos('Khoai Lang Thang')
  const popularVideos = await getPopularVideos()
  return {
    props: { disneyVideos, travelVideos, KLTVideos, popularVideos },
    // will be passed to the page component as props
  }
}

export default function Home({
  disneyVideos,
  travelVideos,
  KLTVideos,
  popularVideos,
}) {
  return (
    <div className={styles.container}>
      <Head>
        <title>Nextflix</title>
        <meta name='description' content='Generated by create next app' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <div className={styles.main}>
        <NavBar username='frankie@example.com' />
        <Banner
          title='Clifford the red dog'
          subTitle='a very cute dog'
          imgUrl='/static/clifford.webp'
        />
        <div className={styles.sectionWrapper}>
          <SectionCards title='Disney' videos={disneyVideos} size='large' />
        </div>
        <div className={styles.sectionWrapper}>
          <SectionCards title='Travel' videos={travelVideos} size='small' />
        </div>
        <div className={styles.sectionWrapper}>
          <SectionCards
            title='Khoai Lang Thang'
            videos={KLTVideos}
            size='small'
          />
        </div>
        <div className={styles.sectionWrapper}>
          <SectionCards title='Popular' videos={popularVideos} size='medium' />
        </div>
      </div>
    </div>
  )
}
