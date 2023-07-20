import styles from './MainPage.module.css';
import UserinfoBox from '../../components/UserinfoBox/UserinfoBox';
import AdHorizontal from '../../components/AdHorizontal/AdHorizontal';
import AdVertical from '../../components/AdVertical/AdVertical';
import SsafyButton from '../../components/SsafyButton/SsafyButton';
import SweaButton from '../../components/SweaButton/SweaButton';
import EduGrantsButton from '../../components/EduGrantsButton/EduGrantsButton';
import BoardView from '../../components/BoardView/BoardView';
import WeatherinfoApi from '../../components/WeatherinfoApi/WeatherinfoApi';

export default function MainPage(){
  return (
    <section>
      <div>
        carousel
      </div>
      <div>
        <UserinfoBox />
        <div>
          <SsafyButton />
          <SweaButton />
          <EduGrantsButton />
        </div>
      </div>
      <AdHorizontal />
      <AdVertical />
      <div>
        <BoardView />
      </div>
        <WeatherinfoApi />

      <div>
      </div>
    </section>
  )
}