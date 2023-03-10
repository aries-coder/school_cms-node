const studentMenu = [
  {
    id: 1,
    name: "系统总览",
    url: "/main/analysis",
    icon: "SettingsSuggestOutlined",
    children: [
      {
        id: 4,
        name: "核心技术",
        url: "/main/analysis/overview",
        items: ["系统总览", "核心技术"]
      },
      {
        id: 5,
        name: "学校简介",
        url: "/main/analysis/profile",
        items: ["系统总览", "学校简介"]
      }
    ]
  },
  {
    id: 2,
    name: "学生管理",
    url: "/main/student",
    icon: "BoyOutlined",
    children: [
      {
        id: 6,
        name: "选课管理",
        url: "/main/student/course",
        items: ["学生管理", "选课管理"]
      },
      {
        id: 7,
        name: "查分管理",
        url: "/main/student/score",
        items: ["学生管理", "查分管理"]
      }
    ]
  },
  {
    id: 3,
    name: "随便聊聊",
    url: "/main/story",
    icon: "ChatFilled",
    children: [
      {
        id: 9,
        name: "您的故事",
        url: "/main/story/chat",
        items: ["随便聊聊", "您的故事"]
      },
      {
        id: 10,
        name: "故事列表",
        url: "/main/story/list",
        items: ["随便聊聊", "故事列表"]
      },
      {
        id: 11,
        name: "聊天室",
        url: "/main/story/room",
        items: ["随便聊聊", "聊天室"]
      }
    ]
  }
]

const teacherMenu = [
  {
    id: 1,
    name: "系统总览",
    url: "/main/analysis",
    icon: "SettingsSuggestOutlined",
    children: [
      {
        id: 4,
        name: "核心技术",
        url: "/main/analysis/overview",
        items: ["系统总览", "核心技术"]
      },
      {
        id: 5,
        name: "学校简介",
        url: "/main/analysis/profile",
        items: ["系统总览", "学校简介"]
      }
    ]
  },
  {
    id: 2,
    name: "教师管理",
    url: "/main/teacher",
    icon: "BoyOutlined",
    children: [
      {
        id: 6,
        name: "选课管理",
        url: "/main/teacher/course",
        items: ["教师管理", "选课管理"]
      },
      {
        id: 7,
        name: "改分管理",
        url: "/main/teacher/score",
        items: ["教师", "改分管理"]
      }
    ]
  },
  {
    id: 3,
    name: "随便聊聊",
    url: "/main/story",
    icon: "ChatFilled",
    children: [
      {
        id: 9,
        name: "您的故事",
        url: "/main/story/chat",
        items: ["随便聊聊", "您的故事"]
      },
      {
        id: 10,
        name: "故事列表",
        url: "/main/story/list",
        items: ["随便聊聊", "故事列表"]
      },
      {
        id: 11,
        name: "聊天室",
        url: "/main/story/room",
        items: ["随便聊聊", "聊天室"]
      }
    ]
  }
]

const adminMenu = [
  {
    id: 1,
    name: "系统总览",
    url: "/main/analysis",
    icon: "SettingsSuggestOutlined",
    children: [
      {
        id: 4,
        name: "核心技术",
        url: "/main/analysis/overview",
        items: ["系统总览", "核心技术"]
      },
      {
        id: 5,
        name: "学校简介",
        url: "/main/analysis/profile",
        items: ["系统总览", "学校简介"]
      }
    ]
  },
  {
    id: 2,
    name: "系统管理",
    url: "/main/system",
    icon: "BoyOutlined",
    children: [
      {
        id: 6,
        name: "学生管理",
        url: "/main/system/student",
        items: ["系统管理", "学生管理"]
      },
      {
        id: 7,
        name: "教师管理",
        url: "/main/system/teacher",
        items: ["系统管理", "教师管理"]
      },
      {
        id: 8,
        name: "课程管理",
        url: "/main/system/course",
        items: ["系统管理", "课程管理"]
      }
    ]
  },
  {
    id: 3,
    name: "随便聊聊",
    url: "/main/story",
    icon: "ChatFilled",
    children: [
      {
        id: 9,
        name: "您的故事",
        url: "/main/story/chat",
        items: ["随便聊聊", "您的故事"]
      },
      {
        id: 10,
        name: "故事列表",
        url: "/main/story/list",
        items: ["随便聊聊", "故事列表"]
      },
      {
        id: 11,
        name: "聊天室",
        url: "/main/story/room",
        items: ["随便聊聊", "聊天室"]
      }
    ]
  }
]

module.exports = {
  studentMenu,
  teacherMenu,
  adminMenu
}