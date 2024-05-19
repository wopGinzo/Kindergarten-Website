import axios from 'axios';

export interface PreRegisterData {
  firstname: string;
  lastname: string;
  childfirstname: string;
  childlastname: string;
  relationship: string;
  age: number;
  plan: string;
  schedule: string;
  email: string;
  password: string;
  phone: string;
}

export const preRegister = async (formData: PreRegisterData) => {
  const reformattedFormData = {
    name: `${formData.firstname} ${formData.lastname}`,
    childName: `${formData.childfirstname} ${formData.childlastname}`,
    age: formData.age,
    email: formData.email,
    password: formData.password,
    phone: formData.phone,
    plan: formData.plan,
    schedule: formData.schedule
  };
  try {
    const response = await axios.post('http://localhost:8000/api/preinscrits/add', reformattedFormData);
    return response.data;
  } catch (error) {
    console.error('Error during pre-registration:', error);
    throw error;
  }
};

export const initiatePayment = async (priceId: string) => {
  console.log("initiating payment for ",priceId)
  try {
    const response = await axios.post('http://localhost:8000/api/payment/create-checkout-session', {
      priceId,
    });
    return response.data.clientSecret;
  } catch (error) {
    console.error('Error during payment initiation:', error);
    throw error;
  }
};