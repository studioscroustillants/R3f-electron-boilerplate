import React, { useRef, useState, useMemo, Suspense, useEffect } from "react";
import {createRoot} from "react-dom/client";
import {createMemoryRouter, RouterProvider, Outlet, Link, useNavigate, useLocation} from "react-router-dom";
import "./static/fonts/material-icons.css"; // material icons stylesheet
import "./static/fonts/open-sans.css"; // open sans font stylesheet
import "./static/css/main.css"; // base stylesheet
import "./static/css/tailwind.css"; // tailwind stylesheet

import electronIcon from "./static/img/electron.png";


// importing views
import WelcomePage from "./views/WelcomePage.jsx";
import Dashboard from "./views/dashboard/Dashboard.jsx";
import Overview from "./views/dashboard/pages/Overview.jsx";
import Settings from "./views/dashboard/pages/Settings.jsx";
import Blinker from "./views/dashboard/pages/Blinker.jsx";

import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import icon from '../assets/icon.svg';
//import './App.css';

//import ReactDOM from 'react-dom'
//import create from 'zustand'
import { Canvas, useFrame, useLoader, extend, useThree, Dom } from '@react-three/fiber'
import { EffectComposer, Noise, Bloom, SSAO, Outline} from '@react-three/postprocessing'
// import { BlendFunction } from 'postprocessing'
import {Sky, Billboard, PerspectiveCamera, PointerLockControls, OrbitControls} from '@react-three/drei'
import * as THREE from 'three'
//import path from 'path'
//import isDev from 'electron-is-dev';
//import {remote} from 'electron'
import Trees from './components/trees'
import Loading from './components/loadingplaceholder'
import './CSS/general.css'
import './CSS/mainmenu.css'
import './CSS/optionsmenu.css'
import './CSS/savemenu.css'

/*const useStore = create((set) => ({
	buildings: [],
	citizens: [{name:"Jeff Un", position:[0,0.75,20]}],
	incrementCitizen: () => set((state) => ({ count: state.citizens.push(CitizenDatas[Math.floor(Math.random()*CitizenDatas.length)]) })),
	// manageCitizen: (objectif)=>set((state) => ({citizens:ManageCitizenTools.initObjectifs(citizens,objectif)})),
	addBuilding: (building) => set((state) => ({ count: state.citizens.push(CitizenDatas[Math.floor(Math.random()*CitizenDatas.length)]) })),
}))*/


const WindowLayout = (props) => {

    const navigate = useNavigate();
    const location = useLocation();
	
	const cameraRef = useRef();
	const treesRef = useRef();
	const drawDistanceRef = useRef(250);

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const closeWindow = () => {
        navigate("/");
        //window.electronAPI.closeWindow()
    };
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    //const minimizeWindow = window.electronAPI.minimizeWindow;
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    //const maximizeWindow = window.electronAPI.maximizeWindow;

    // Returns a React component for the window/frame of the application
	
	return(
		<>
		<div id={"maindiv"} tabIndex={"0"}>
		  <div id={"canvascontainer"}>
			<Canvas
			>
			<mesh position={[-100,0.75,-100]} >
				<boxGeometry args={[10, 10, 10]} />
				<meshStandardMaterial color={'orange'} />
			</mesh>

			<ambientLight intensity={0.9} />
			<OrbitControls />
				//dynamic
				<Suspense fallback={<Loading />}>
					<Trees ref={treesRef} halfSize={1250}/>
				</Suspense>
			</Canvas>
		  </div>
		</div>
		</>
	);
}

export function render() {
    const body = document.getElementById("root");
    const root = createRoot(body);

    const router = createMemoryRouter([
        {
            path: "/",
            element: <WindowLayout />,
            children: [
                {
                    path: "",
                    element: <WelcomePage />
                },
                {
                    path: "/dashboard",
                    element: <Dashboard />,
                    children: [
                        {
                            path: "/dashboard/overview",
                            element: <Overview />
                        },
                        {
                            path: "/dashboard/blinker",
                            element: <Blinker />
                        },
                        {
                            path: "/dashboard/reminders",
                            element: <></>
                        },
                        {
                            path: "/dashboard/settings",
                            element: <Settings />
                        }
                    ]
                }
            ]
        }
    ], {
        initialEntries: ["/", "/dashboard/blinker"],
        initialIndex: 1
    });

    root.render(<RouterProvider router={router} />);
}
