
export const USER_LOGIN = 'USER_LOGIN';
export const PUT_USER = 'PUT_USER';


export const loginUser = (
  { email, password }: { email: string; password: string }) => (
    {
      type: USER_LOGIN,
      payload: {
        email,
        password
      }
    }
  );

export const putUser = (response: any) => (
  {
    type: PUT_USER,
    payload: response.data
  }
)


