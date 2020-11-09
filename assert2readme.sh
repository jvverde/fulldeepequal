#!/usr/bin/env bash
sed -i -E s#(assert\.eq)(.+)#isClone\2  // TRUE# README.md
sed -i -E s#(assert\.ne)(.+)#isClone\2  // FALSE# README.md
