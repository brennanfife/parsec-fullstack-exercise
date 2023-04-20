import axios from 'axios';

export async function getContract(
  address: string | undefined,
  func: string | undefined,
  args: string[],
) {
  if (!address || !func) return [];
  else {
    try {
      let URL = `/api/contract?address=${address.toLowerCase()}&func=${func}`;
      if (args.length > 0) URL += `&args=${args}`;

      const { data } = await axios.get(URL);

      return data.value;
    } catch (e: any) {
      throw new Error(e.response.data.message);
    }
  }
}
