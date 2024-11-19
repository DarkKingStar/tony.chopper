import { ANIME } from "@/utils/fetcher";
import { ResponseEntity } from "@/utils/response";
import { HTTP_STATUS_CODE } from "@/utils/StatusCode";
import { IAnimeResult, ISearch } from "darkconsumet";
import { NextRequest } from "next/server";


export const POST = async (req: NextRequest) => {
    try {
      // Parse JSON from the request body
      const body = await req.json();
      if (!body || !body.query) {
        return ResponseEntity({message: "Invalid request body", body:{
          query: "STRING"
        }}, HTTP_STATUS_CODE.bad_request);
      }
      const query: string = body.query;
      const data: ISearch<IAnimeResult> = await ANIME.search(query);
      return ResponseEntity(data , HTTP_STATUS_CODE.success);
    } catch (err: any) {
      return ResponseEntity({ message: err.message }, HTTP_STATUS_CODE.bad_request);
    }
}