import React from "react";
import { UncontrolledCarousel, Row, Col,Container } from "reactstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "../css/Project.css";

const items = [
  {
    src:
      "/images/urban-railway.jpg",
    altText: "Slide 1",
    caption: "",
    header: "Daha sürdürülebilir...",
    key: "1",
  },
  {
    src:"/images/secure-railway.jpg",
    altText: "Slide 2",
    caption: "",
    header: "Daha güvenli...",
    key: "2",
  },
  {
    src: "/images/cloud-railway.jpg",
    altText: "Slide 3",
    caption: "",
    header: "Daha dijital...",
    key: "3",
  },
];

//Project will not include any states.
//This will be located in Homepage component.


const Project = () => (
  <div className="project-div">
  <Row className="project-row">
    <Col md="8" className="mx-auto">
      <UncontrolledCarousel className="project-carousel" items={items}/>
    </Col>
  </Row>
  <Container className="project-container">
    <Row>
    <p className="project-p text-justify">
      Daha sürdürülebilir, daha güvenli, daha dijital bir demiryolu altyapısı için yola çıktık. Yenilenen ve dijitalleşen dünyada yeni endüstriyel devrimin getirdiği yenilikleri, ülkemizin demiryolu alt yapısında  var olan kronik sorunların çözümünde uyguluyoruz. 
    </p>
    <p className="project-p text-justify">
      Yaz aylarında ray sıcaklıklarında görülen ciddi yükselmeler, demiryolu ağlarında yapılması gereken rutin bakımları aksatır. Hava sıcaklıklarına bağlı olarak neredeyse tüm yaza yayılan aksamalar demiryolu alt yapısının sağlığında sorunlar oluşturabilmektedir. Ray sıcaklıklarındaki artış kurplarda yapılan çalışmaları zora soktuğu gibi aynı zaman hat hızlarının da geçici olarak azaltılmasına neden olur. Bu da hatta seyreden trenlerin hızlarının izlenmesi gerekliliğini ortaya çıkarır.
    
    </p>
    <p className="project-p text-justify">
      Birden fazla noktada ray sıcaklığı ve seyir halindeki trenlerin hızlarını dijital ortama aktararak izliyoruz ve kontrol ediyoruz. Meteorolojik verilere göre ray sıcaklığını makine öğrenmesi/derin öğrenme ile öngörerek bakım planlarının oluşturulmasına katkıda bulunuyoruz. Anlık tren hızlarının izlenmesi ile ray sıcaklıklarına göre anlık olarak hatlarda müsade edilebilir tren hızlarını belirliyoruz. Daha güvenli ve daha konforlu bir ulaşım imkanı sunmak için demiryollarını dijitalleştiriyoruz.
    </p>
    </Row>
  </Container>
  </div>
);

export default Project;