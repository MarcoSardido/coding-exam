import React from 'react';
import {Container, Jumbotron} from 'reactstrap';

function Index() {
  return (
    <Container>
      <Jumbotron className="mt-5">
        <h1 className="display-4">MarcoSardido</h1>
        <address>
          <a href="mailto:email@address.com">msardido.dev@gmail.com</a>
          <br />
          <a href="tel:+635552368">(+63) 123-1234-1234</a>
        </address>
      </Jumbotron>
    </Container>
  );
}

export default Index;
