import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { Container, Header, Content, Footer } from "rsuite";
import LinkModal from "../components/Modal/LinkModal";
import Decoration from "./Decoration";
import Gallery from "./Gallery";
import Selection from "./Selection";
import PicBooth from "./PicBooth";
import MainController from "../controller/MainController";

// Button
import MuteBtn from "./../components/Btn/MuteBtn";
import PicDoneBtn from "../components/Btn/PicDoneBtn";
import TakePicBtn from "./../components/Btn/TakePicBtn";
import CameraTransBtn from "./../components/Btn/CameraTransBtn";
import SelectDoneBtn from "../components/Btn/SelectDoneBtn";
import DecoDoneBtn from "../components/Btn/DecoDoneBtn";
import PicDownloadBtn from "../components/Btn/PicDownloadBtn";
import GalleryDoneBtn from "../components/Btn/GalleryDoneBtn";

// Message
import DecoMessage from "../components/Message/DecoMessage";
import GalleryMessage from "../components/Message/GalleryMessage";
import SelectMessage from "../components/Message/SelectMessage";

// List
import MemberList from "../components/List/MemberList";
import ColorList from "../components/List/ColorList";
import TabBar from "../components/TabBar/TabBar";
import DecoList from "../components/List/DecoList";

import "../style/style.css";
import "./Picpico.css";
import store from "../store";
import { setErrorInfo } from "../slice/errorInfo";

const Picpico = () => {
    const { id } = useParams();
    const picBoothDone = useSelector(state => state.picpicoInfo.picBoothDisplay);
    const selectDone = useSelector(state => state.picpicoInfo.selectionDisplay);
    const decoDone = useSelector(state => state.picpicoInfo.decoDisplay);
    const galleryDone = useSelector(state => state.picpicoInfo.galleryDisplay);
    const controller = MainController();
    const error = useSelector(state => state.errorInfo.error);
    const nickName = useSelector(state => state.membersInfo.nickname);

    useEffect(() => {
        controller.init(id, nickName);
    }, []);

    return (
        <>
            {picBoothDone ? (
                <Container className="default_container">
                    <Header className="picbooth_header">
                        <LinkModal />
                        <h3 style={{ fontFamily: "'Palatino Linotype', 'Book Antiqua', Palatino, serif", color: "#7986CB", textAlign: "center" }}>PicPico</h3>

                        <PicDoneBtn />
                    </Header>
                    <Content>
                        <MemberList />
                        <PicBooth />
                    </Content>
                    <Footer className="picbooth_footer">
                        <MuteBtn />
                        <TakePicBtn />
                        <CameraTransBtn />
                    </Footer>
                </Container>
            ) : selectDone ? (
                <Container className="default_container">
                    <Header className="selection_header">
                        <MuteBtn className="muted_left" />
                        <SelectMessage />
                        <SelectDoneBtn />
                        {/* <p style={{ visibility: "hidden" }}>hidden</p> */}
                    </Header>
                    <Content>
                        <MemberList />
                    </Content>
                    <Footer>
                        <Selection />
                    </Footer>
                    <Footer className="selection_footer"></Footer>
                </Container>
            ) : decoDone ? (
                <Container className="default_container">
                    <Header className="deco_header">
                        <MuteBtn className="muted_left" />
                        <DecoMessage />
                        <DecoDoneBtn />
                    </Header>
                    <Content>
                        <MemberList />
                        <Decoration controller={controller} />
                    </Content>

                    {/* Color List & Sticker List */}
                    <Footer>
                        <DecoList />
                    </Footer>
                    <Footer className="deco_footer">
                        <Footer>
                            <TabBar />
                        </Footer>
                    </Footer>
                </Container>
            ) : galleryDone ? (
                <Container className="default_container">
                    <Header className="gallery_header">
                        <MuteBtn className="muted_left" />
                        <GalleryMessage />
                        <GalleryDoneBtn />
                    </Header>
                    <Content>
                        <MemberList />
                        <Gallery />
                    </Content>
                </Container>
            ) : null}
        </>
    );
};
export default Picpico;
