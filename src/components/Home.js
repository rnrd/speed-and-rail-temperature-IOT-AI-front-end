import React, { Component } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import { FaTemperatureLow } from 'react-icons/fa';
import { FiMonitor } from 'react-icons/fi';
import "../css/Home.css";
import { Button} from 'reactstrap';


class Home extends Component {
    
    //Home will not include any states.
    //This will be located in Homepage component.

    render() {
        return (
          <div>
            <section className="section-1 cover">
              <div className="container h-100">
                <div className="row h-100 align-items-center">
                  <div className="col-12 text-center">
                    <h1 className="home-h1">
                        DEMİRYOLU REFAH VE UYGARLIK YOLUDUR.
                    </h1>
                    <p className="home-p1">
                        Mustafa Kemal ATATÜRK
                    </p>
                  </div>
                </div>
              </div>
            </section>

            <section  className="section-2">
        <div className="section-2-content container">
            <div className="row justify-content-center">
                <div className="col-md-4">
                    <div className="project-item">
                        <div className="home-icons" ><FaTemperatureLow size="3em"/></div>
                        <div className="row justify-content-start ">
                            <h3>Tahmin</h3>
                        </div>
                        <p className="text-center">Makine öğrenmesini deneyimleyin.</p>
                        <div className="row justify-content-center" id="bilgi-al">
                            <Button className="bg-dark" onClick={(e)=>{
                                e.preventDefault();
                                this.props.propsWithHistory.history.push("/prediction")
                            }} >Tahminle</Button>
                        </div>

                    </div>
                </div>

                <div className="col-md-4">
                    <div className="panel-item">
                        <div className="home-icons"><FiMonitor  size="3em"/></div> 
                        <div className="row justify-content-start ">
                            <h3>Panel</h3>
                        </div>
                        <p className="text-center">Sistemi tümüyle canlı izleyin.</p>
                        <div className="row justify-content-center" id="paneli-yonet">
                            <Button  className="bg-dark" onClick={(e)=>{
                                e.preventDefault();
                                this.props.propsWithHistory.history.push("/dashboard")
                            }} >Paneli yönet</Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
          </div>
        );
    }
}

export default Home;