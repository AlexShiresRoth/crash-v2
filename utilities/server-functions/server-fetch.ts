type Params = {
  url: string;
  bodyParams?: Object;
  method: "GET" | "POST" | "PUT";
  headers?: any;
};

//fetch is built into Next.js server components and is not currently implemented in the client components
export default async function serverFetch({
  url,
  bodyParams,
  method,
  headers,
}: Params) {
  return await fetch(url, {
    method,
    headers,
    mode: "cors",
    body: JSON.stringify(bodyParams),
    next: { revalidate: 120 },
  })
    .then((response) => {
      return response.json();
    })
    .then((data) => data)
    .catch((error) => {
      console.error("Error Fetching blueshift live content:", error);
    });
}
