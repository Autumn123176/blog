export default {
  home: () => [
    {
      icon: "el-icon-edit-outline",
      route: "/editor"
    }
  ],
  index: () => [
    {
      icon: "el-icon-edit-outline",
      route: "/editor"
    }
  ],
  // column: () => [
  //   {
  //     icon: 'el-icon-plus',
  //     handler: 'addColumn'
  //   }
  // ],
  article: () => [
    {
      icon: "el-icon-star-on",
      exce: true,
      handler: "handlerLikeArticle"
    },
    {
      icon: "el-icon-edit",
      handler: "handlerFocusTextarea"
    }
  ]
}