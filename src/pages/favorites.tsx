import React from 'react';
import './favorites.css'; // Ensure that you import corresponding CSS if needed for styling

const Favorites: React.FC = () => {
  return (
    <div id="iphone13&14-3" className="iphone13&14-3">
      <div id="settings" className="settings">Settings</div>
      <div id="line55" className="line55"></div>
      <div id="ellipse20" className="ellipse20"></div>
      <div id="favorites" className="favorites">Favorites</div>
      <div id="ellipse21" className="ellipse21"></div>
      <div id="resources" className="resources">Resources</div>
      <div id="ellipse22" className="ellipse22"></div>
      <div id="home" className="home">Home</div>
      <div id="ellipse23" className="ellipse23"></div>

      <img
        id="settings2"
        className="settings2"
        src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAG+SURBVHgB5VXLbYNAEB2QZfkW3IF98eeUuII4FcSpwOnApALjChJXEKcEV+CkAjsny3CADsKZA+SNBGhZBozEKcqTVuxnZt7szOxA9NdhNBFyXfeYJMmdtn0aj8eza7omNQCMD4TtATVAicD3fet8Pg/UNT6WoGulZ6JehlKILpeLz94ZhrHDdwvvbXyXJIBlcL7HmGO+xDiNRqOHSgLE+hnC79QC0H+ZTCZvJQK+nmmaB2oY2xqE3W53CIS8yHPQ6XSWdcbh2TfGFtMNRkDVsKIosnO7ioFFjfEtrm0rWw5u7ODGa0keubjP5+pBhVKAeh9KhpCzAye4zplCmU6nUwefD01hTxXA2Ved8RJBKhQWBEzzhlqgQIArvyJ+K42wMjeQfdTWK8/z1iJBGk9bsGMxsb7JhoT+RHEcO3isx2ytVhHHcy4Q8JkNpUWWD4TtFoZE2ZQkz1teRdxLUL/cJixqhwAPbVZ6aLwBDzfUEvB+kxkvEDC4hyBRn5iG6at9Iq1sVXCzw5gpMgFKfVeQ0ZW4J/V6vTDzIg3dj0SAUPQzOV2vkkACEswEem5CvPD+Nd1GfzSEIRC2A/oX+AUUMeWLCLWuDAAAAABJRU5ErkJggg=="
        alt="settings"
      />
      <img
        id="home2"
        className="home2"
        src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAFbSURBVHgB7VTLbYNAEF0gcKaDwIXPLe4AV5CkAjsVRFQQpwLcAXYH6cAugRviI0EJviMgb2KwgBgvtq9+0mrGs7Nv34xnYWwCkiRxwjDUpuSKvIQ4jj+rqtqJopiB+IuXL4xtZFmmFkXh1XW97B0QhI0sy66u64fJhFQeFO3galgHKHQpjpgHo2LliM1t2865hGmaLsqyXJ87OLwIal3DMDbd870eol8eyChBBdFWUZRZVwX5FIO7pRy0wx/2VWhvliTJR4JDv2Fdy7LW7AJwZgW1LVkAAe90odj0ZtmQ/ZXII2vUrlAyqc2xXojjX8lUChL3bCLQv4Adyz/haSwZ/STV/rk9KPsY/hktRgcbZNote9yXAnybpinQIp+XPIXwKjwI70c7h0FjF5i/Z3LwYmaYNxqRt0sx8pu9nOzpaxNF0Q/MK7sBuGSPQZ/3CAl48A47fpquQd59rr/oZ6vj3RbRvgAAAABJRU5ErkJggg=="
        alt="home"
      />
      <img
        id="bookmark"
        className="bookmark"
        src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAELSURBVHgB7ZTLDYJQEEUHMKwtwS0rpQPsgBLoQKyAWAFagViBlkAHuOO3wQ5oAPCOPhJCQCDBHTeZvP/JzJAL0cyS2hthGG4kSTIR66HHZVl6mqZlvcA0TQ1cumM6CGtA94D69XrVPKyqymEYsvMwfw2wtghTURR+4/cBNzwWRXFql9IWt0aWZbN+U0ummbUAF6AQHOQkSXIYc3f161D4+gF7sSsojmNbWC2jqRlyRnBCACDDMhHsjiCKInsSEP68wlJnTNcYL6qq6hxY3+jrdRdgt+ttZ8mAGBhylHdEeV7jyEIbfMD4h2COzhAZ+IDpLdhHvMd9xJ2n2MqpT/wREBaNFN9Fr3f0T70Bk0B2grF8fT8AAAAASUVORK5CYII="
        alt="bookmark"
      />
      <img
        id="book2"
        className="book2"
        src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAADxSURBVHgB7ZXBDYJAEEVnFw8cLQFOhBsl0IF0IFZArMBYAXYgJWAHluAROFnCWgDgxwjBCYFFPfITMuzs8JiF7F9BTEVReAgeaaqua1VV1c113XszXjHYGQUhzZRhGAnC7gMIWPiGKSFEqsmy8IzfT3TAdgLx6DjOiTTUNIHg93OSF0kpFf0gSX/WAlyAX2jFE9gpUZ7nB9IQateTQJrhNEMaAqawoz1pCCYS4IpHgSi4tN42JZiDwrJpEIiurjCGLQpifMMNwDomYfFEB0RXSZZlHkARhgF/85jQzKO9F3yyOQLKspz1Y0zTTG3bfq3oCf7/YU6mWAfaAAAAAElFTkSuQmCC"
        alt="book2"
      />
      <div id="favorites2" className="favorites2">Favorites</div>
      <img
        id="rectangle42"
        className="rectangle42"
        src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAATsAAABzCAYAAADnoKVyAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAGsSURBVHgB7dbBDYJAFEXRwdgX1mVwZbAuO4MdoYa556z+b+DmLeu2HwNgco8BECB2QMLz/vy/7wEwi9fnd92WHZAgdkCCtwU+THCHbcFoB5ARvIPpEsA9a6/8C/zlARUiBcogdIwdcvFT2yHBRMAcyafskpQK8ZB2RItFBeY2BuQaAHS6vqlnNyyEE5IN2BkIrNGs8TbMhn8tdJGwAnSgRzRAzLw7gnUJtBNMRZCxkxHBVtGnAI6SnALlkBRVCQuAY2AGtMt0iqAFTwM4qNF8R6gDNmhoTegblEgIWpK2BaJFJEPhvNADOTG5BcM2A8vLGzOYBbNYPHTytEQidZBepFVABsw5noUtA5N5vIAD2CL8bFIQEJnsNQJJXYF7QccN42QF3M2zMAJpI20JtI+gRM0XIVSGzEgxyCfwEmDSIpEC/ARJ2DWCflD/QEdSYBXEc6P9JJADsk2ffks+AtsT0gtU/9LLoG/QZ1OtGQdkDZ1gA9o03YG8E2dYN2PNqvMikNh+edr5AweNjtjtvGH6XVagzGV/tvzPxgiMbaV/1Ntv/bOxAAAAAElFTkSuQmCC"
        alt="rectangle"
      />
    </div>
  );
};

export default Favorites;