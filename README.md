# predprodalzheimer
predict prodromal alzheimer

<h1>Installation manual for developers</h1>
The FSL-web-application visualises and simplifies the use of FSL. The goal of this document is, hence, to help developers to quick and easily get started with the setup of this project. 
<i>Please note, since FSL is only runnable on Linux and MacOs, this guide does not provide any information on specific windows application options. If you are a windows user, please use a virtual machine for this set up procedure.</i>

<h2>1: Downloading the project</h2>
<ul>
  <li>1)	Go to GitHub and download the project via the following link: https://github.com/stefankam/predprodalzheimer, Alternatively, you can clone the files directly into you own local directory. </li>
</ul>

<h2>2: Installing FSL and Octave (you could also use MATHLAB</h2>
<ul>
<li>1)	To install FSL, follow the instructions given on the official FSL website, https://fsl.fmrib.ox.ac.uk/fsl/fslwiki/FslInstallation. Once installed, simply type fsl in the terminal to check if the application is running. Make sure, that FSL is saved to your computer’s environment. ($FSLDIR).</li>
<li>2)	Install octave. This step should be runnable without any further issues.</li>
</ul>

<h2>3: Checking the pre-requirements</h2>
<ul>
<li>1)	Firstly, you will have to make sure you will have to make sure that Pyhton is available on your computer.</li>
<li>2)	Also npm has to be downloaded and accessible on your computer. To do so navigate to the following link to access the nodejs packages https://nodejs.org/en/download/ </li>
<li>3)	Then verify if the package PIP (“PIP Installs Packages”) is installed and up to date. You can do that by following the instructions below:
> python3 -m pip install --user --upgrade pip
> python3 -m pip –version
> pip –version
If the outcome of this last command is somewhat like: 
pip 22.0.2 from C:\Users\…\Programs\Python\Python310\lib\site-packages\pip (python 3.10)., pip was successfully installed. </li>
<li>4)	Finally, check if you have the virtual envirnoment package for python, and if not, install it.
> python3 -m pip install --user virtualenv
Once all pre-requirements met, you can move on to point four.</li>
</ul>

<h2>4: Setting up your virtual environment</h2>
<ul>
Open the downloaded project in a code editor of your preference and via the terminal navigate to: cd ../predprodalzheimer-scratch/fsl_frontend/fsl_backend 
<li>1) And there create your virtual environment: 
> python3 -m venv [yourVirtualEnvironmentName]
If your virtual environment was created, a new folder carrying the name of [yourVirtualEnvironmentName] will appear.
Now, you should be able to activate and disactivate your virtual environment by typing the following command in your terminal:
> source env/bin/activate
Once activated the name of your virtual environment should appear in parentheses.
To deactivate the virtual environment simply type deactivate.</li>
</ul>

<h2>5: Installing packages</h2>
<ul>
With the activated virtual environment, you can proceed with the installation on the various packages needed. 
<li>1) Therefor simply run :</li>
> python3 -m pip install -r requirements.txt
which will install all the packages listed in the requirements.txt.
<li>2) Next, installing npm, but make sure your virutal environment is not activated.
> sudo apt install npm 
A folder containing the relevant node modules should appear. </li>
<li>3) Finally you can configure the. flaskenv and .env files, so you can access the postgreSQL database of your choice. </li>
<li>4) Run the database script, that is located in the project’s folder postgresql.</li>
</ul>
