import { ANIME } from "@/utils/fetcher";
import { ResponseEntity } from "@/utils/response";
import { HTTP_STATUS_CODE } from "@/utils/StatusCode";
import { IAnimeResult, ISearch } from "darkconsumet";
import { NextRequest } from "next/server";

// http://localhost:3000/api/anime/genres/:[type]
export const POST = async (req: NextRequest) => {
    try {
      const type: string | undefined  = req.nextUrl.pathname.split('/').pop();
      const body = await req.json();
      if (!body || !body.page) {
        return ResponseEntity({message: "Invalid request body", body:{
          page: "NUMBER"
        }}, HTTP_STATUS_CODE.bad_request);
      }
      const page: number = parseInt(body.page);
      const data: ISearch<IAnimeResult> = await ANIME.genreSearch(type as string, page);
      return ResponseEntity(data , HTTP_STATUS_CODE.success);
    } catch (err: any) {
      return ResponseEntity({ message: err.message }, HTTP_STATUS_CODE.bad_request);
    }
}