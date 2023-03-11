export interface Guest {
    guest: {
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
    }
  }