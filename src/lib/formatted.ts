import { format } from "date-fns";

export const formatTimeTo12Hour = (time: string) => {
  const [hours, minutes, seconds] = time.split(':').map(Number);
  const date = new Date();
  date.setHours(hours)
  date.setMinutes(minutes)
  date.setSeconds(seconds)
  return format(date, 'hh:mm a');
}

export const formattedDate = (date: string) => {
  return date
      ? format(new Date(date), "dd-MM-yyyy")
      : "...";
}


export const formattedGender = (gender: string) => {
  return gender === "MALE" ? "M" : "F"
}


export const formatToDollar = (value: number) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(value);
};

export const getNoNumber = (
  index: number,
  pageNumber: number,
  pageSize: number
) => {
  return (pageNumber - 1) * pageSize + index + 1;
};

export const formattedFullname = (
  lastname: string | undefined,
  firstname: string | undefined
) => {
  if (!lastname || !firstname) return "N/A";
  return lastname + " " + firstname;
};


export const formattedEmail = (email: string) => {
  return email ? email : "N/A"
}

export const formattedPhone = (phone: string) => {
  return phone ? phone : "N/A"
}
