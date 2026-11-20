// Model-identifiable reference photographs, individually mapped to each vehicle.
// Wikimedia Commons file pages contain creator credit and license information.
// These are NOT photographs of real dealership stock; replace with VIN-matched photos before accepting deposits.
export type ReferencePhoto = { url: string; source: string; name: string }
export const referencePhotos: Record<string, ReferencePhoto[]> = {
  "1": [
    { url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/96/2023_Mercedes-AMG_GLE_63_S_4MATIC_Coupe_IMG_0247.jpg/1024px-2023_Mercedes-AMG_GLE_63_S_4MATIC_Coupe_IMG_0247.jpg', source: 'https://commons.wikimedia.org/wiki/File:2023_Mercedes-AMG_GLE_63_S_4MATIC_Coupe_IMG_0247.jpg', name: '2023 Mercedes-AMG GLE 63 S 4MATIC Coupe IMG 0247.jpg' },
    { url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/51/2023_Mercedes-AMG_GLE_63_S_4MATIC_Coupe_IMG_2133.jpg/1024px-2023_Mercedes-AMG_GLE_63_S_4MATIC_Coupe_IMG_2133.jpg', source: 'https://commons.wikimedia.org/wiki/File:2023_Mercedes-AMG_GLE_63_S_4MATIC_Coupe_IMG_2133.jpg', name: '2023 Mercedes-AMG GLE 63 S 4MATIC Coupe IMG 2133.jpg' },
    { url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7f/2023_Mercedes-AMG_GLE_63_S_4MATIC_Coupe_IMG_2136.jpg/1024px-2023_Mercedes-AMG_GLE_63_S_4MATIC_Coupe_IMG_2136.jpg', source: 'https://commons.wikimedia.org/wiki/File:2023_Mercedes-AMG_GLE_63_S_4MATIC_Coupe_IMG_2136.jpg', name: '2023 Mercedes-AMG GLE 63 S 4MATIC Coupe IMG 2136.jpg' },
  ],
  "2": [
    { url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f1/Mercedes-AMG_GLC_43_4MATIC%2B_Coupe_(C254)_front.jpg/1024px-Mercedes-AMG_GLC_43_4MATIC%2B_Coupe_(C254)_front.jpg', source: 'https://commons.wikimedia.org/wiki/File:Mercedes-AMG_GLC_43_4MATIC%2B_Coupe_(C254)_front.jpg', name: 'Mercedes-AMG GLC 43 4MATIC+ Coupe (C254) front.jpg' },
    { url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Mercedes-AMG_GLC_43_4MATIC%2B_Coup%C3%A9_(C254)_front.jpg/1024px-Mercedes-AMG_GLC_43_4MATIC%2B_Coup%C3%A9_(C254)_front.jpg', source: 'https://commons.wikimedia.org/wiki/File:Mercedes-AMG_GLC_43_4MATIC%2B_Coup%C3%A9_(C254)_front.jpg', name: 'Mercedes-AMG GLC 43 4MATIC+ Coupé (C254) front.jpg' },
  ],
  "3": [
    { url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/33/21_Mercedes-AMG_GLC63_S_Coupe.jpg/1024px-21_Mercedes-AMG_GLC63_S_Coupe.jpg', source: 'https://commons.wikimedia.org/wiki/File:21_Mercedes-AMG_GLC63_S_Coupe.jpg', name: '21 Mercedes-AMG GLC63 S Coupe.jpg' },
    { url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/21/Mercedes-AMG_GLC_63_S_Coup%C3%A9_(51092971525).jpg/1024px-Mercedes-AMG_GLC_63_S_Coup%C3%A9_(51092971525).jpg', source: 'https://commons.wikimedia.org/wiki/File:Mercedes-AMG_GLC_63_S_Coup%C3%A9_(51092971525).jpg', name: 'Mercedes-AMG GLC 63 S Coupé (51092971525).jpg' },
    { url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d1/Mercedes-AMG_GLC_63_S_Coup%C3%A9_(53145188687).jpg/1024px-Mercedes-AMG_GLC_63_S_Coup%C3%A9_(53145188687).jpg', source: 'https://commons.wikimedia.org/wiki/File:Mercedes-AMG_GLC_63_S_Coup%C3%A9_(53145188687).jpg', name: 'Mercedes-AMG GLC 63 S Coupé (53145188687).jpg' },
  ],
  "4": [
    { url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b5/Mercedes_AMG_GT_4_Door_Coupe.jpg/1024px-Mercedes_AMG_GT_4_Door_Coupe.jpg', source: 'https://commons.wikimedia.org/wiki/File:Mercedes_AMG_GT_4_Door_Coupe.jpg', name: 'Mercedes AMG GT 4 Door Coupe.jpg' },
    { url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1f/Mercedes_AMG_GT_4_Door_Coupe_1.jpg/1024px-Mercedes_AMG_GT_4_Door_Coupe_1.jpg', source: 'https://commons.wikimedia.org/wiki/File:Mercedes_AMG_GT_4_Door_Coupe_1.jpg', name: 'Mercedes AMG GT 4 Door Coupe 1.jpg' },
  ],
  "5": [
    { url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1f/2022_Lamborghini_Urus.jpg/1024px-2022_Lamborghini_Urus.jpg', source: 'https://commons.wikimedia.org/wiki/File:2022_Lamborghini_Urus.jpg', name: '2022 Lamborghini Urus.jpg' },
    { url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/ff/2022_Lamborghini_Urus_1.jpg/1024px-2022_Lamborghini_Urus_1.jpg', source: 'https://commons.wikimedia.org/wiki/File:2022_Lamborghini_Urus_1.jpg', name: '2022 Lamborghini Urus 1.jpg' },
    { url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e6/2022_Lamborghini_Urus%2C_front_right%2C_06-27-2024.jpg/1024px-2022_Lamborghini_Urus%2C_front_right%2C_06-27-2024.jpg', source: 'https://commons.wikimedia.org/wiki/File:2022_Lamborghini_Urus%2C_front_right%2C_06-27-2024.jpg', name: '2022 Lamborghini Urus, front right, 06-27-2024.jpg' },
  ],
  "6": [
    { url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/dc/Land_Rover_Range_Rover_Autobiography_L460_Charente_Grey_(1).jpg/1024px-Land_Rover_Range_Rover_Autobiography_L460_Charente_Grey_(1).jpg', source: 'https://commons.wikimedia.org/wiki/File:Land_Rover_Range_Rover_Autobiography_L460_Charente_Grey_(1).jpg', name: 'Land Rover Range Rover Autobiography L460 Charente Grey (1).jpg' },
    { url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c7/Land_Rover_Range_Rover_Autobiography_L460_Charente_Grey_(5).jpg/1024px-Land_Rover_Range_Rover_Autobiography_L460_Charente_Grey_(5).jpg', source: 'https://commons.wikimedia.org/wiki/File:Land_Rover_Range_Rover_Autobiography_L460_Charente_Grey_(5).jpg', name: 'Land Rover Range Rover Autobiography L460 Charente Grey (5).jpg' },
  ],
  "7": [
    { url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e7/22_Lexus_IS_500_F_Sport_Performance.jpg/1024px-22_Lexus_IS_500_F_Sport_Performance.jpg', source: 'https://commons.wikimedia.org/wiki/File:22_Lexus_IS_500_F_Sport_Performance.jpg', name: '22 Lexus IS 500 F Sport Performance.jpg' },
    { url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/99/Lexus_IS_500_F_Sport_Performance_(2022)_(52223499415).jpg/1024px-Lexus_IS_500_F_Sport_Performance_(2022)_(52223499415).jpg', source: 'https://commons.wikimedia.org/wiki/File:Lexus_IS_500_F_Sport_Performance_(2022)_(52223499415).jpg', name: 'Lexus IS 500 F Sport Performance (2022) (52223499415).jpg' },
    { url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d8/Lexus_IS_500_F_Sport_Performance_(2022)_(52223499335).jpg/1024px-Lexus_IS_500_F_Sport_Performance_(2022)_(52223499335).jpg', source: 'https://commons.wikimedia.org/wiki/File:Lexus_IS_500_F_Sport_Performance_(2022)_(52223499335).jpg', name: 'Lexus IS 500 F Sport Performance (2022) (52223499335).jpg' },
  ],
  "8": [
    { url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/32/Lexus_IS_350_F_Sport_2022.jpg/1024px-Lexus_IS_350_F_Sport_2022.jpg', source: 'https://commons.wikimedia.org/wiki/File:Lexus_IS_350_F_Sport_2022.jpg', name: 'Lexus IS 350 F Sport 2022.jpg' },
    { url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/55/Lexus_IS_350_F_Sport_GSE31_2022.jpg/1024px-Lexus_IS_350_F_Sport_GSE31_2022.jpg', source: 'https://commons.wikimedia.org/wiki/File:Lexus_IS_350_F_Sport_GSE31_2022.jpg', name: 'Lexus IS 350 F Sport GSE31 2022.jpg' },
  ],
  "9": [
    { url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/55/Lexus_IS_350_F_Sport_GSE31_2022.jpg/1024px-Lexus_IS_350_F_Sport_GSE31_2022.jpg', source: 'https://commons.wikimedia.org/wiki/File:Lexus_IS_350_F_Sport_GSE31_2022.jpg', name: 'Lexus IS 350 F Sport GSE31 2022.jpg' },
    { url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/32/Lexus_IS_350_F_Sport_2022.jpg/1024px-Lexus_IS_350_F_Sport_2022.jpg', source: 'https://commons.wikimedia.org/wiki/File:Lexus_IS_350_F_Sport_2022.jpg', name: 'Lexus IS 350 F Sport 2022.jpg' },
  ],
  "10": [
    { url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e0/Lexus_RX_350_1_(32583535501).jpg/1024px-Lexus_RX_350_1_(32583535501).jpg', source: 'https://commons.wikimedia.org/wiki/File:Lexus_RX_350_1_(32583535501).jpg', name: 'Lexus RX 350 1 (32583535501).jpg' },
    { url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f9/Lexus_RX_350_2_(32706148765).jpg/1024px-Lexus_RX_350_2_(32706148765).jpg', source: 'https://commons.wikimedia.org/wiki/File:Lexus_RX_350_2_(32706148765).jpg', name: 'Lexus RX 350 2 (32706148765).jpg' },
  ],
  "11": [
    { url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c4/Toyota_Venza_V6_2011.jpg/1024px-Toyota_Venza_V6_2011.jpg', source: 'https://commons.wikimedia.org/wiki/File:Toyota_Venza_V6_2011.jpg', name: 'Toyota Venza V6 2011.jpg' },
    { url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b3/Toyota_Venza_V6_2011_(13681020485).jpg/1024px-Toyota_Venza_V6_2011_(13681020485).jpg', source: 'https://commons.wikimedia.org/wiki/File:Toyota_Venza_V6_2011_(13681020485).jpg', name: 'Toyota Venza V6 2011 (13681020485).jpg' },
  ],
  "12": [
    { url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/bc/Mercedes-AMG_C63_S_FOS21_black.jpg/1024px-Mercedes-AMG_C63_S_FOS21_black.jpg', source: 'https://commons.wikimedia.org/wiki/File:Mercedes-AMG_C63_S_FOS21_black.jpg', name: 'Mercedes-AMG C63 S FOS21 black.jpg' },
    { url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/10/Mercedes-AMG_C63_S_W205.jpg/1024px-Mercedes-AMG_C63_S_W205.jpg', source: 'https://commons.wikimedia.org/wiki/File:Mercedes-AMG_C63_S_W205.jpg', name: 'Mercedes-AMG C63 S W205.jpg' },
  ],
  "13": [
    { url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/91/2022_Mercedes_G_63_AMG_4Matic_Auto.jpg/1024px-2022_Mercedes_G_63_AMG_4Matic_Auto.jpg', source: 'https://commons.wikimedia.org/wiki/File:2022_Mercedes_G_63_AMG_4Matic_Auto.jpg', name: '2022 Mercedes G 63 AMG 4Matic Auto.jpg' },
    { url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f8/2022_Mercedes_G_63_AMG_4Matic_Auto_2.jpg/1024px-2022_Mercedes_G_63_AMG_4Matic_Auto_2.jpg', source: 'https://commons.wikimedia.org/wiki/File:2022_Mercedes_G_63_AMG_4Matic_Auto_2.jpg', name: '2022 Mercedes G 63 AMG 4Matic Auto 2.jpg' },
    { url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f1/2022_Mercedes_G_63_AMG_4Matic_Auto_3.jpg/1024px-2022_Mercedes_G_63_AMG_4Matic_Auto_3.jpg', source: 'https://commons.wikimedia.org/wiki/File:2022_Mercedes_G_63_AMG_4Matic_Auto_3.jpg', name: '2022 Mercedes G 63 AMG 4Matic Auto 3.jpg' },
  ],
  "14": [
    { url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c9/2021_Mercedes-AMG_A_45_S_4MATIC%2B.jpg/1024px-2021_Mercedes-AMG_A_45_S_4MATIC%2B.jpg', source: 'https://commons.wikimedia.org/wiki/File:2021_Mercedes-AMG_A_45_S_4MATIC%2B.jpg', name: '2021 Mercedes-AMG A 45 S 4MATIC+.jpg' },
    { url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/89/Mercedes-AMG_A_45_S_4MATIC%2B_(W177).jpg/1024px-Mercedes-AMG_A_45_S_4MATIC%2B_(W177).jpg', source: 'https://commons.wikimedia.org/wiki/File:Mercedes-AMG_A_45_S_4MATIC%2B_(W177).jpg', name: 'Mercedes-AMG A 45 S 4MATIC+ (W177).jpg' },
  ],
  "15": [
    { url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/ff/2024_Mercedes-AMG_CLE_53_4MATIC%2B_Coup%C3%A9.jpg/1024px-2024_Mercedes-AMG_CLE_53_4MATIC%2B_Coup%C3%A9.jpg', source: 'https://commons.wikimedia.org/wiki/File:2024_Mercedes-AMG_CLE_53_4MATIC%2B_Coup%C3%A9.jpg', name: '2024 Mercedes-AMG CLE 53 4MATIC+ Coupé.jpg' },
    { url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/64/Mercedes-AMG_CLE_53_(front).jpg/1024px-Mercedes-AMG_CLE_53_(front).jpg', source: 'https://commons.wikimedia.org/wiki/File:Mercedes-AMG_CLE_53_(front).jpg', name: 'Mercedes-AMG CLE 53 (front).jpg' },
    { url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/de/Mercedes-AMG_CLE_53_(rear).jpg/1024px-Mercedes-AMG_CLE_53_(rear).jpg', source: 'https://commons.wikimedia.org/wiki/File:Mercedes-AMG_CLE_53_(rear).jpg', name: 'Mercedes-AMG CLE 53 (rear).jpg' },
  ],
  "16": [
    { url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/28/Mercedes-AMG_CLA_45_S_(51820402318).jpg/1024px-Mercedes-AMG_CLA_45_S_(51820402318).jpg', source: 'https://commons.wikimedia.org/wiki/File:Mercedes-AMG_CLA_45_S_(51820402318).jpg', name: 'Mercedes-AMG CLA 45 S (51820402318).jpg' },
    { url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/82/Mercedes-AMG_CLA_45_S_4MATIC%2B_(C118)_1X7A1741.jpg/1024px-Mercedes-AMG_CLA_45_S_4MATIC%2B_(C118)_1X7A1741.jpg', source: 'https://commons.wikimedia.org/wiki/File:Mercedes-AMG_CLA_45_S_4MATIC%2B_(C118)_1X7A1741.jpg', name: 'Mercedes-AMG CLA 45 S 4MATIC+ (C118) 1X7A1741.jpg' },
  ],
  "17": [
    { url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/16/Mercedes-Benz_GLA_250_e_AMG_Line_(H_247)_%E2%80%93_f_11042021.jpg/1024px-Mercedes-Benz_GLA_250_e_AMG_Line_(H_247)_%E2%80%93_f_11042021.jpg', source: 'https://commons.wikimedia.org/wiki/File:Mercedes-Benz_GLA_250_e_AMG_Line_(H_247)_%E2%80%93_f_11042021.jpg', name: 'Mercedes-Benz GLA 250 e AMG Line (H 247) – f 11042021.jpg' },
    { url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6a/Mercedes-Benz_GLA_250_e_AMG_Line_(H_247)_%E2%80%93_h_11042021.jpg/1024px-Mercedes-Benz_GLA_250_e_AMG_Line_(H_247)_%E2%80%93_h_11042021.jpg', source: 'https://commons.wikimedia.org/wiki/File:Mercedes-Benz_GLA_250_e_AMG_Line_(H_247)_%E2%80%93_h_11042021.jpg', name: 'Mercedes-Benz GLA 250 e AMG Line (H 247) – h 11042021.jpg' },
  ],
  "18": [
    { url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/22/Mercedes-Benz_C-Klasse_Coup%C3%A9_(C205)_C_300_(2020)_(53322684786).jpg/1024px-Mercedes-Benz_C-Klasse_Coup%C3%A9_(C205)_C_300_(2020)_(53322684786).jpg', source: 'https://commons.wikimedia.org/wiki/File:Mercedes-Benz_C-Klasse_Coup%C3%A9_(C205)_C_300_(2020)_(53322684786).jpg', name: 'Mercedes-Benz C-Klasse Coupé (C205) C 300 (2020) (53322684786).jpg' },
    { url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/52/Mercedes-Benz_C-Klasse_Coup%C3%A9_(C205)_C_300_(2020)_(53322684801).jpg/1024px-Mercedes-Benz_C-Klasse_Coup%C3%A9_(C205)_C_300_(2020)_(53322684801).jpg', source: 'https://commons.wikimedia.org/wiki/File:Mercedes-Benz_C-Klasse_Coup%C3%A9_(C205)_C_300_(2020)_(53322684801).jpg', name: 'Mercedes-Benz C-Klasse Coupé (C205) C 300 (2020) (53322684801).jpg' },
  ],
  "19": [
    { url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/49/Mercedes-Benz_E-Klasse_(W213)_E_350_4MATIC_(2021)_(53646420160).jpg/1024px-Mercedes-Benz_E-Klasse_(W213)_E_350_4MATIC_(2021)_(53646420160).jpg', source: 'https://commons.wikimedia.org/wiki/File:Mercedes-Benz_E-Klasse_(W213)_E_350_4MATIC_(2021)_(53646420160).jpg', name: 'Mercedes-Benz E-Klasse (W213) E 350 4MATIC (2021) (53646420160).jpg' },
    { url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/cd/00_Mercedes-Benz_W213_Facelift_e350amg.jpg/1024px-00_Mercedes-Benz_W213_Facelift_e350amg.jpg', source: 'https://commons.wikimedia.org/wiki/File:00_Mercedes-Benz_W213_Facelift_e350amg.jpg', name: '00 Mercedes-Benz W213 Facelift e350amg.jpg' },
  ],
  "20": [
    { url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8c/2020_Lexus_GX_460_in_Sonic_Titanium%2C_front_right.jpg/1024px-2020_Lexus_GX_460_in_Sonic_Titanium%2C_front_right.jpg', source: 'https://commons.wikimedia.org/wiki/File:2020_Lexus_GX_460_in_Sonic_Titanium%2C_front_right.jpg', name: '2020 Lexus GX 460 in Sonic Titanium, front right.jpg' },
    { url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/66/2020_Lexus_GX_460_in_Sonic_Titanium%2C_rear_right.jpg/1024px-2020_Lexus_GX_460_in_Sonic_Titanium%2C_rear_right.jpg', source: 'https://commons.wikimedia.org/wiki/File:2020_Lexus_GX_460_in_Sonic_Titanium%2C_rear_right.jpg', name: '2020 Lexus GX 460 in Sonic Titanium, rear right.jpg' },
  ],
  "21": [
    { url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6a/2019_Lexus_LX_570_Sport_4x4_5.7_URJ201R_(20190722).jpg/1024px-2019_Lexus_LX_570_Sport_4x4_5.7_URJ201R_(20190722).jpg', source: 'https://commons.wikimedia.org/wiki/File:2019_Lexus_LX_570_Sport_4x4_5.7_URJ201R_(20190722).jpg', name: '2019 Lexus LX 570 Sport 4x4 5.7 URJ201R (20190722).jpg' },
    { url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c0/Lexus_LX_570_URJ201W_2019.jpg/1024px-Lexus_LX_570_URJ201W_2019.jpg', source: 'https://commons.wikimedia.org/wiki/File:Lexus_LX_570_URJ201W_2019.jpg', name: 'Lexus LX 570 URJ201W 2019.jpg' },
  ],
  "22": [
    { url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/27/2022_Lexus_ES_350_(GSZ10)_1X7A0296.jpg/1024px-2022_Lexus_ES_350_(GSZ10)_1X7A0296.jpg', source: 'https://commons.wikimedia.org/wiki/File:2022_Lexus_ES_350_(GSZ10)_1X7A0296.jpg', name: '2022 Lexus ES 350 (GSZ10) 1X7A0296.jpg' },
    { url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/75/2019_Lexus_ES_350_sedan%2C_7.12.19.jpg/1024px-2019_Lexus_ES_350_sedan%2C_7.12.19.jpg', source: 'https://commons.wikimedia.org/wiki/File:2019_Lexus_ES_350_sedan%2C_7.12.19.jpg', name: '2019 Lexus ES 350 sedan, 7.12.19.jpg' },
  ],
  "23": [
    { url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1b/2022_Lexus_NX_350%2C_front_3.7.22.jpg/1024px-2022_Lexus_NX_350%2C_front_3.7.22.jpg', source: 'https://commons.wikimedia.org/wiki/File:2022_Lexus_NX_350%2C_front_3.7.22.jpg', name: '2022 Lexus NX 350, front 3.7.22.jpg' },
    { url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c5/2022_Lexus_NX_350%2C_rear_3.7.22.jpg/1024px-2022_Lexus_NX_350%2C_rear_3.7.22.jpg', source: 'https://commons.wikimedia.org/wiki/File:2022_Lexus_NX_350%2C_rear_3.7.22.jpg', name: '2022 Lexus NX 350, rear 3.7.22.jpg' },
  ],
  "24": [
    { url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/16/Lexus_RC350_F_SPORT_(GSC10)_front.JPG/1024px-Lexus_RC350_F_SPORT_(GSC10)_front.JPG', source: 'https://commons.wikimedia.org/wiki/File:Lexus_RC350_F_SPORT_(GSC10)_front.JPG', name: 'Lexus RC350 F SPORT (GSC10) front.JPG' },
    { url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5b/2018_Lexus_RC_350_GSC10_(1).jpg/1024px-2018_Lexus_RC_350_GSC10_(1).jpg', source: 'https://commons.wikimedia.org/wiki/File:2018_Lexus_RC_350_GSC10_(1).jpg', name: '2018 Lexus RC 350 GSC10 (1).jpg' },
  ],
  "25": [
    { url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/64/2020_Lexus_LS500_F_Sport_4WD_in_White_Nova_Glass_Flakes%2C_front_right.jpg/1024px-2020_Lexus_LS500_F_Sport_4WD_in_White_Nova_Glass_Flakes%2C_front_right.jpg', source: 'https://commons.wikimedia.org/wiki/File:2020_Lexus_LS500_F_Sport_4WD_in_White_Nova_Glass_Flakes%2C_front_right.jpg', name: '2020 Lexus LS500 F Sport 4WD in White Nova Glass Flakes, front right.jpg' },
    { url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4d/18_Lexus_LS_500_Base.jpg/1024px-18_Lexus_LS_500_Base.jpg', source: 'https://commons.wikimedia.org/wiki/File:18_Lexus_LS_500_Base.jpg', name: '18 Lexus LS 500 Base.jpg' },
  ],
  "26": [
    { url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/cb/Lexus_UX_250h.jpg/1024px-Lexus_UX_250h.jpg', source: 'https://commons.wikimedia.org/wiki/File:Lexus_UX_250h.jpg', name: 'Lexus UX 250h.jpg' },
    { url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a3/Lexus_UX_250h_front.jpg/1024px-Lexus_UX_250h_front.jpg', source: 'https://commons.wikimedia.org/wiki/File:Lexus_UX_250h_front.jpg', name: 'Lexus UX 250h front.jpg' },
  ],
  "27": [
    { url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b7/Toyota_Land_Cruiser_Prado_(2021)_(53939116278).jpg/1024px-Toyota_Land_Cruiser_Prado_(2021)_(53939116278).jpg', source: 'https://commons.wikimedia.org/wiki/File:Toyota_Land_Cruiser_Prado_(2021)_(53939116278).jpg', name: 'Toyota Land Cruiser Prado (2021) (53939116278).jpg' },
    { url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/cd/Toyota_Land_Cruiser_Prado_(51787829630).jpg/1024px-Toyota_Land_Cruiser_Prado_(51787829630).jpg', source: 'https://commons.wikimedia.org/wiki/File:Toyota_Land_Cruiser_Prado_(51787829630).jpg', name: 'Toyota Land Cruiser Prado (51787829630).jpg' },
  ],
  "28": [
    { url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/bd/2022_Tesla_Model_Y_Long_Range_AWD_Front.jpg/1024px-2022_Tesla_Model_Y_Long_Range_AWD_Front.jpg', source: 'https://commons.wikimedia.org/wiki/File:2022_Tesla_Model_Y_Long_Range_AWD_Front.jpg', name: '2022 Tesla Model Y Long Range AWD Front.jpg' },
    { url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/96/2022_Tesla_Model_Y_Long_Range_AWD.jpg/1024px-2022_Tesla_Model_Y_Long_Range_AWD.jpg', source: 'https://commons.wikimedia.org/wiki/File:2022_Tesla_Model_Y_Long_Range_AWD.jpg', name: '2022 Tesla Model Y Long Range AWD.jpg' },
  ],
}
