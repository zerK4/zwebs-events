export interface ApiResponse {
    message: string;
    data:  {
        id: number;
        firstName: string;
        lastName: string;
        email: string;
        phoneNumber: string;
        location: string;
        vegan: boolean;
        accomodation: boolean;
        kids: boolean;
        eventId: string;
        token: string;
    },
    found: boolean;
  }