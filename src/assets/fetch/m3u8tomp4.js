export const M3u8toMp4 = async(m3u8Url) =>{
    const response = await fetch(m3u8Url);
    const m3u8Content = await response.text();
    const lines = m3u8Content.split('\n');
    const segmentUrls = lines.filter(line => line.endsWith('.ts')).map(line => new URL(line, m3u8Url).toString());

    const segmentResponses = await Promise.all(segmentUrls.map(url => fetch(url)));
    const segmentBlobs = await Promise.all(segmentResponses.map(response => response.blob()));

    const combinedBlob = new Blob(segmentBlobs, { type: 'video/mp4' });
    const videoUrl = URL.createObjectURL(combinedBlob);
    
    return videoUrl;
}
