import React from 'react'
import {Container,Col,Row} from 'reactstrap';
import "bootstrap/dist/css/bootstrap.min.css";
import makina from  "../images/ege-makina-logo.png";
import fen from "../images/fen-logo.png";
import "../css/Contact.css"

//this component will always be seen on the page and does not have any states
function Contact() {
    return (
      <div>
        <section className="section-contact">
          <Container className="container-contact justify-content-center">
            <Row className=" container-row justify-content-center">
              <Col sm="4" className="rounded float-left">
                <img
                  className="img-ege"
                  src={makina}
                  width="75"
                  height="75"
                  alt="100"
                />
              </Col>
              <Col sm="4" className="justify-content-center">
                <h5 className="contact-h5 text-center">İLETİŞİM</h5>
                <p className="contact-p2 text-center">
                  Adres: Erzene, Ege Ünv. 35040 Bornova/İzmir
                </p>
                <p className="contact-p2 text-center">Telefon: (0232) 311 18 98</p>
              </Col>
              <Col sm="4" className="rounded float-right">
                <img
                  className="img-makina rounded float-right"
                  src={fen}
                  width="75"
                  height="75"
                  alt="ege"
                />
              </Col>
            </Row>
          </Container>
        </section>
      </div>
    );
}

export default Contact;


