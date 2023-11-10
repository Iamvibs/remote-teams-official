import { url } from "../../../../../../store/actions/config";
export default [
  {
    id: "what_we_do_template_one",
    thumbnail: require("./1.png"),
    headline:
      "<h1><span style='font-size:36px'><strong>WHAT WE DO </strong></span></h1>",
    backgroundColor: "#282F32",
    // image_one_src:require('./img/1.png'),
    image_one_src: `${url}/public/download?filename=file-2020-08-03T11:17:53.116Z.png`,
    image_one_width: "100%",
    image_one_crop: { unit: "%" },
    display_logo: false,
    icon_name_one: "fa-crop",
    icon_background_one: "grey",
    icon_size_one: "fa-lg",
    icon_one_color: "white",
    para_one_text:
      "<p style='text-align:left'><span style='font-size:12px'>Lorem Ipsum Dolor Sit Amet, Consectetur Adipiscing Elit, Sed Do Eiusmod Tempor Incididunt Ut Labore Et Dolore Magna Aliqua. Ut Enim Ad Minim Veniam, Quis Nostrud Exercitation Ullamco Laboris Nisi Ut Aliquip Ex Ea Commodo Consequat. Duis Aute Irure Dolor In Reprehenderit In Voluptate Velit Esse Cillum Dolore Eu Fugiat Nulla Pariatur. Excepteur Sint Occaecat Cupidatat Non Proident, Sunt In Culpa Qui Officia Deserunt Mollit Anim Id Est Laborum.</span></p>",
  },
  {
    id: "what_we_do_template_two",
    thumbnail: require("./2.png"),
    headline:
      "<h1><span style='font-size:36px'><strong>WHAT WE DO </strong></span></h1>",
    backgroundColor: "#282F32",
    // image_one_src:require('./img/1.png'),
    image_one_src: `${url}/public/download?filename=file-2020-08-04T12:49:31.262Z.png`,
    image_one_width: "100%",
    image_one_crop: { unit: "%" },
    display_logo: false,
    icon_name_one: "fa-crop",
    icon_background_one: "grey",
    icon_size_one: "fa-lg",
    icon_one_color: "white",
    para_one_text:
      "<p style='text-align:left'><span style=`font-size:12px`>Lorem Ipsum Dolor Sit Amet, Consectetur Adipiscing Elit, Sed Do Eiusmod Tempor Incididunt Ut Labore Et Dolore Magna Aliqua. Ut Enim Ad Minim Veniam, Quis Nostrud Exercitation Ullamco Laboris Nisi Ut Aliquip Ex Ea Commodo Consequat. Duis Aute Irure Dolor In Reprehenderit In Voluptate Velit Esse Cillum Dolore Eu Fugiat Nulla Pariatur. Excepteur Sint Occaecat Cupidatat Non Proident, Sunt In Culpa Qui Officia Deserunt Mollit Anim Id Est Laborum.</span></p>",
  },
  /*{
    id: "what_we_do_template_three",
    thumbnail: require("./3.png"),
    headline:
      "<h1><span style='font-size:36px'><strong>What We Do</strong></span></h1>",
    backgroundColor: "white",
    // image_one_src:require('./img/1.png'),
    image_one_src:
      "https://login.dominate.ai/public/download?filename=file-2020-01-23T18:06:42.281Z.png",
    image_one_width: "100%",
    image_one_crop: { unit: "%" },
    image_two_src:
      "https://login.dominate.ai/public/download?filename=file-2020-01-23T11:14:54.203Z.png",
    image_two_width: "100%",
    image_two_crop: { unit: "%" },
    display_logo: false,
    icon_name_one: "fa-globe",
    icon_background_one: "white",
    icon_size_one: "fa-3x",
    icon_one_color: "black",
    icon_name_two: "fa-map-marker",
    icon_background_two: "white",
    icon_size_two: "fa-3x",
    icon_two_color: "black",
    para_one_headline: "<h1><strong>Headline 1</strong></h1>",
    para_one_text:
      "<p style='text-align:justify'><span style='font-size:11px'>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</span></p>",
    para_two_headline: "<h1><strong>Headline 2</strong></h1>",
    para_two_text:
      "<p style='text-align:justify'><span style='font-size:11px'>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</span></p>",
  },
  {
    id: "what_we_do_template_four",
    thumbnail: require("./4.png"),
    headline:
      "<h1><span style='font-size:36px'><strong>What We Do</strong></span></h1>",
    backgroundColor: "white",
    // image_one_src:require('./img/1.png'),
    image_one_src:
      "https://login.dominate.ai/public/download?filename=file-2020-01-24T01:56:38.856Z.png",
    image_one_width: "100%",
    image_one_crop: { unit: "%" },
    image_two_src:
      "https://login.dominate.ai/public/download?filename=file-2020-01-23T11:14:54.203Z.png",
    image_two_width: "100%",
    image_two_crop: { unit: "%" },
    display_logo: false,
    icon_name_one: "fa-bug",
    icon_background_one: "white",
    icon_size_one: "fa-3x",
    icon_one_color: "black",
    icon_name_two: "fa-code",
    icon_background_two: "white",
    icon_size_two: "fa-3x",
    icon_two_color: "black",
    icon_name_three: "fa-shield",
    icon_background_three: "white",
    icon_size_three: "fa-3x",
    icon_three_color: "black",
    para_one_headline: "<h1><strong>Headline 1</strong></h1>",
    para_one_text:
      "<p style='text-align:justify'><span style='font-size:11px'>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</span></p>",
    para_two_headline: "<h1><strong>Headline 2</strong></h1>",
    para_two_text:
      "<p style='text-align:justify'><span style='font-size:11px'>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</span></p>",
    para_three_headline: "<h1><strong>Headline 3</strong></h1>",
    para_three_text:
      "<p style='text-align:justify'><span style='font-size:11px'>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</span></p>",
  },
  {
    id: "what_we_do_template_five",
    thumbnail: require("./5.png"),
    headline:
      "<h1><span style='font-size:36px'><strong>What We Do</strong></span></h1>",
    backgroundColor: "white",
    // image_one_src:require('./img/1.png'),
    image_one_src:
      "https://login.dominate.ai/public/download?filename=file-2020-01-24T01:56:38.856Z.png",
    image_one_width: "100%",
    image_one_crop: { unit: "%" },
    image_two_src:
      "https://login.dominate.ai/public/download?filename=file-2020-01-23T11:14:54.203Z.png",
    image_two_width: "100%",
    image_two_crop: { unit: "%" },
    display_logo: false,
    icon_name_one: "fa-cogs",
    icon_background_one: "grey",
    icon_size_one: "fa-3x",
    icon_one_color: "white",

    icon_name_two: "fa-bug",
    icon_background_two: "grey",
    icon_size_two: "fa-3x",
    icon_two_color: "white",

    icon_name_three: "fa-code",
    icon_background_three: "grey",
    icon_size_three: "fa-3x",
    icon_three_color: "white",

    icon_name_four: "fa-shield",
    icon_background_four: "grey",
    icon_size_four: "fa-3x",
    icon_four_color: "white",

    icon_name_five: "fa-hashtag",
    icon_background_five: "grey",
    icon_size_five: "fa-3x",
    icon_five_color: "white",

    icon_name_six: "fa-bar-chart-o",
    icon_background_six: "grey",
    icon_size_six: "fa-3x",
    icon_six_color: "white",

    para_one_headline:
      "<h1><span style=`font-size:16px`><strong><span style=`font-family:Arial,Helvetica,sans-serif`>Headline</span> 1</strong></span></h1>",
    para_one_text:
      "<p style='text-align:justify'><span style='font-size:11px'>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</span></p>",
    para_two_headline:
      "<h1><span style=`font-size:16px`><strong><span style=`font-family:Arial,Helvetica,sans-serif`>Headline</span> 1</strong></span></h1>",
    para_two_text:
      "<p style='text-align:justify'><span style='font-size:11px'>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</span></p>",
    para_three_headline:
      "<h1><span style=`font-size:16px`><strong><span style=`font-family:Arial,Helvetica,sans-serif`>Headline</span> 1</strong></span></h1>",
    para_three_text:
      "<p style='text-align:justify'><span style='font-size:11px'>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</span></p>",
    para_four_headline:
      "<h1><span style=`font-size:16px`><strong><span style=`font-family:Arial,Helvetica,sans-serif`>Headline</span> 1</strong></span></h1>",
    para_four_text:
      "<p style='text-align:justify'><span style='font-size:11px'>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</span></p>",
    para_five_headline:
      "<h1><span style=`font-size:16px`><strong><span style=`font-family:Arial,Helvetica,sans-serif`>Headline</span> 1</strong></span></h1>",
    para_five_text:
      "<p style='text-align:justify'><span style='font-size:11px'>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</span></p>",
    para_six_headline:
      "<h1><span style=`font-size:16px`><strong><span style=`font-family:Arial,Helvetica,sans-serif`>Headline</span> 1</strong></span></h1>",
    para_six_text:
      "<p style='text-align:justify'><span style='font-size:11px'>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</span></p>",
  },*/
];