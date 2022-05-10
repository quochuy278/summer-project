import { FormatLetterCase } from "mdi-material-ui";

const MainNavigation = () => {
    return [
      {
        title: "All Courses",
        path: "/pages/allcourses",
        needAuthenticated: false
      },
      {
        title: "My Course",
        path: "/pages/mycourse",
        needAuthenticated: true
      },
    ];
}

export default MainNavigation