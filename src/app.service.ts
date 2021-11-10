import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return `<P>POST /auth/signup - Body:{email,password}</p> 
    <P>POST /auth/signin - Body:{email,password}</p>
    <P>POST /auth/signout </p>
    <P>GET /auth/whoami - get current user</p>
    <P>POST /reports - Body:{make, model, year, mileage, lng, lat, price}</p>
    <P>PATCH /reports/:id - Body:{approved}</p>
    <P>GET /reports - Query: make, model, year, mileage, lng, lat, price</p>
    `;
  }
}
