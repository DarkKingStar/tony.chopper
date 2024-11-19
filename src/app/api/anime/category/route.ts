import { ResponseEntity } from "@/utils/response";
import { HTTP_STATUS_CODE } from "@/utils/StatusCode";
import { IAnimeResult, ISearch } from "darkconsumet";
import { NextRequest } from "next/server";
import {ANIME} from "@/utils/fetcher";
enum AnimeType {
  MostPopular = "most-popular",
  MostFavorite = "most-favorite",
  LatestCompleted = "latest-completed",
  TopAiring = "top-airing",
  RecentlyUpdated = "recently-updated",
  RecentlyAdded = "recently-added",
  TopUpcoming = "top-upcoming",
  SubbedAnime = "subbed-anime",
  DubbedAnime = "dubbed-anime",
  Movies = "movies",
  TV = "tv",
  OVA = "ova",
  Special = "special",
  ONA = "ona",
}


export const POST = async (req: NextRequest) => {
  try {
    // Parse JSON from the request body
    const body = await req.json();

    if (!body || !body.page || !body.type) {
      return ResponseEntity({message: "Invalid request body", body:{
        page: "NUMBER",
        type: JSON.stringify(AnimeType),
      }}, HTTP_STATUS_CODE.bad_request);
    }
    const page: number = parseInt(body.page);
    const type: AnimeType = body.type;
    let data: ISearch<IAnimeResult>;
    switch (type) {
      case "most-popular":
        data = await ANIME.fetchMostPopular(page);
        break;
      case "most-favorite":
        data = await ANIME.fetchMostFavorite(page);
        break;
      case "latest-completed":
        data = await ANIME.fetchLatestCompleted(page);
        break;
      case "top-airing":
        data = await ANIME.fetchTopAiring(page);
        break;
      case "recently-updated":
        data = await ANIME.fetchRecentlyUpdated(page);
        break;
      case "recently-added":
        data = await ANIME.fetchRecentlyAdded(page);
        break;
      case "top-upcoming":
        data = await ANIME.fetchTopUpcoming(page);
        break;
      case "subbed-anime":
        data = await ANIME.fetchSubbedAnime(page);
        break;
      case "dubbed-anime":
        data = await ANIME.fetchDubbedAnime(page);
        break;
      case "movies":
        data = await ANIME.fetchMovie(page);
        break;
      case "tv":
        data = await ANIME.fetchTV(page);
        break;
      case "ova":
        data = await ANIME.fetchOVA(page);
        break;
      case "ona":
        data = await ANIME.fetchONA(page);
        break;
      case "special":
        data = await ANIME.fetchSpecial(page);
        break;
      default:
        return ResponseEntity({ message: "Invalid type",type: JSON.stringify(AnimeType) }, HTTP_STATUS_CODE.bad_request);
    }   
    if(!data){
      return ResponseEntity({ message: "Invalid type",type: JSON.stringify(AnimeType) }, HTTP_STATUS_CODE.bad_request);
    } 
    return ResponseEntity(data, HTTP_STATUS_CODE.success);
  } catch (error: any) {
    return ResponseEntity({ message: error.message }, HTTP_STATUS_CODE.bad_request);
  }
};

