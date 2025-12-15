// eslint-disable-next-line @typescript-eslint/no-unused-vars
import {Grid, Container} from "@mui/material";
import {Temperature} from "@/components/temperature/temperature";

import {Search} from "@/components/search/search";
import {LocationWidget} from "@/components/locationWidget/locationWidget";
import {Skeleton} from "@mui/material";
import '@/app/css/weather-icons.css'
import {DailyWidgetContainer} from "@/components/dailyWidget/dailyWidgetContainer";
import {Hourly} from "@/components/hourly/hourly";

export default function Home() {
  return (
      <>
          <Container maxWidth='xl'>


              <Grid container spacing={3} sx={{display:'flex', justifyContent:'flex-start'}} >
                  <Grid size={12} sx={{display:'flex',justifyContent:'center'}}>

                      <Search/>
                  </Grid>

                  <Grid size={12} >

                        <LocationWidget/>

                  </Grid>
            {/* Change size={4} to responsive props */}
            <Grid size={{ xs: 12, md: 4 }} sx={{display:'flex', justifyContent:'center'}}>
                <Temperature/>
            </Grid>
            <Grid size={{ xs: 12, md: 4 }} sx={{display:'flex', justifyContent:'center'}}>

               <Hourly/>
              </Grid>

              </Grid>
              <Grid container spacing={3} sx={{display:'flex', justifyContent:'flex-start', mt:3}}>
                  <Grid size={{ xs: 12, md: 4 }} sx={{display:'flex', justifyContent:'center'}}>
                      <DailyWidgetContainer/>
                  </Grid>
              </Grid>
          </Container>
        </>
  );
}
